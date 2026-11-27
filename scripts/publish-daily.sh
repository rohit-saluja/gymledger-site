#!/bin/bash
# Publishes scheduled blog posts. Run daily by the launch agent that
# scripts/install-publish-job.sh installs (06:30 local time).
#
# A post goes live when its `date` is today or earlier (lib/blog.ts). This
# script keeps a dedicated checkout of origin/main, works out which posts are
# live today, and if that set differs from the last deploy it builds the
# static site, deploys it with wrangler, and pings IndexNow with the new URLs.
# Nothing is deployed on days when no post changes state, and a day the Mac
# was asleep is caught up on the next run.
#
#   scripts/publish-daily.sh            normal run
#   scripts/publish-daily.sh --dry-run  report what would happen, change nothing
set -euo pipefail

CHECKOUT="${GYMLEDGER_PUBLISH_CHECKOUT:-$HOME/Library/Application Support/GymLedger/publish-checkout}"
STATE_DIR="$HOME/Library/Application Support/GymLedger"
STATE="$STATE_DIR/live-posts.txt"
DRY=0
[ "${1:-}" = "--dry-run" ] && DRY=1

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

mkdir -p "$STATE_DIR"
if [ ! -d "$CHECKOUT/.git" ]; then
  log "no checkout at $CHECKOUT; run scripts/install-publish-job.sh first"
  exit 1
fi

cd "$CHECKOUT"
git fetch --quiet origin main
git reset --quiet --hard origin/main
log "checkout at $(git rev-parse --short HEAD)"

# Reinstall dependencies only when the lockfile changes.
LOCK_HASH=$(shasum package-lock.json | cut -d' ' -f1)
if [ ! -d node_modules ] || [ "$(cat "$STATE_DIR/lock-hash" 2>/dev/null)" != "$LOCK_HASH" ]; then
  log "installing dependencies"
  npm ci --no-audit --no-fund --loglevel=error
  echo "$LOCK_HASH" > "$STATE_DIR/lock-hash"
fi

TODAY=$(TZ=Asia/Kolkata date +%F)
LIVE=$(for f in content/blog/*.md; do
  d=$(sed -n 's/^date: "\(.*\)"$/\1/p' "$f" | head -1)
  if [[ "$d" < "$TODAY" || "$d" == "$TODAY" ]]; then basename "$f" .md; fi
done | sort)

NEW=$(comm -13 <(sort "$STATE" 2>/dev/null || true) <(echo "$LIVE"))
if [ -f "$STATE" ] && [ -z "$NEW" ]; then
  log "no posts went live since the last deploy ($(echo "$LIVE" | wc -l | tr -d ' ') live); nothing to do"
  exit 0
fi
log "going live: $(echo "$NEW" | tr '\n' ' ')"

if [ "$DRY" = 1 ]; then
  log "dry run: would build, deploy and ping IndexNow"
  exit 0
fi

rm -rf out
npx next build
npx wrangler deploy

# Tell Bing and other IndexNow engines about the new pages and the updated lists.
KEY=$(sed -n 's/.*INDEXNOW_KEY = "\([a-f0-9]*\)".*/\1/p' lib/site.ts)
URLS=$( { echo "https://www.getgymledger.com/blog"; echo "https://www.getgymledger.com/sitemap.xml"; for s in $NEW; do echo "https://www.getgymledger.com/blog/$s"; done; } | sed 's/.*/"&"/' | paste -sd, -)
curl -s -o /dev/null -w "IndexNow: HTTP %{http_code}\n" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"www.getgymledger.com\",\"key\":\"$KEY\",\"keyLocation\":\"https://www.getgymledger.com/$KEY.txt\",\"urlList\":[$URLS]}"

echo "$LIVE" > "$STATE"
log "deployed; $(echo "$LIVE" | wc -l | tr -d ' ') posts live"
