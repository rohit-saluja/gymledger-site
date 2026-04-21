source "https://rubygems.org"

# Use Jekyll 4.x locally so modern Ruby (3.2+) works.
# GitHub Pages builds server-side with its own pinned Jekyll — no Gemfile.lock needed there.
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Required on Ruby 3.4+ where these stdlib gems became bundled separately.
gem "webrick", "~> 1.8"
gem "csv"
gem "base64"
gem "bigdecimal"
