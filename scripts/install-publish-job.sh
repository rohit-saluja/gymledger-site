#!/bin/bash
# Installs the daily publish job on this Mac: a dedicated checkout of the
# repo, and a launch agent that runs a copy of scripts/publish-daily.sh at 06:30.
# Run it again after changing publish-daily.sh.
# Safe to run again. Remove with:
#   launchctl bootout gui/$(id -u)/com.getgymledger.publish
#   rm ~/Library/LaunchAgents/com.getgymledger.publish.plist
set -euo pipefail

SUPPORT="$HOME/Library/Application Support/GymLedger"
CHECKOUT="$SUPPORT/publish-checkout"
LOGS="$HOME/Library/Logs/GymLedger"
PLIST="$HOME/Library/LaunchAgents/com.getgymledger.publish.plist"
REPO=$(git -C "$(dirname "$0")" remote get-url origin)
NODE_BIN=$(dirname "$(command -v node)")

mkdir -p "$SUPPORT" "$LOGS"
if [ ! -d "$CHECKOUT/.git" ]; then
  git clone --quiet "$REPO" "$CHECKOUT"
fi
# The job resets the checkout every run, so it runs its own copy of the script.
cp "$(dirname "$0")/publish-daily.sh" "$SUPPORT/publish-daily.sh"

cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.getgymledger.publish</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>$SUPPORT/publish-daily.sh</string>
  </array>
  <key>WorkingDirectory</key><string>$CHECKOUT</string>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key><string>$NODE_BIN:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    <key>HOME</key><string>$HOME</string>
  </dict>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>6</integer><key>Minute</key><integer>30</integer></dict>
  <key>StandardOutPath</key><string>$LOGS/publish.log</string>
  <key>StandardErrorPath</key><string>$LOGS/publish.log</string>
</dict>
</plist>
EOF

launchctl bootout "gui/$(id -u)/com.getgymledger.publish" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "Installed com.getgymledger.publish (daily 06:30). Checkout: $CHECKOUT. Log: $LOGS/publish.log"
