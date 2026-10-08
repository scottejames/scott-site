#!/usr/bin/env bash
# Build the site locally (private posts live only on this machine) and publish dist/
# to the gh-pages branch of this repo's `origin` remote.
set -euo pipefail
cd "$(dirname "$0")/.."

password=$(grep -E '^PRIVATE_BLOG_PASSWORD=' .env 2>/dev/null | cut -d= -f2- || true)
if [[ -z "$password" || "$password" == "test-password-123" ]]; then
  echo "Set a real PRIVATE_BLOG_PASSWORD in .env before deploying." >&2
  exit 1
fi

remote=$(git remote get-url origin)
npm run build
touch dist/.nojekyll

cd dist
git init -q -b gh-pages
git add -A
git commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
# gh-pages holds build output only, so replacing it on every deploy is expected.
git push -qf "$remote" gh-pages
rm -rf .git
echo "Deployed to gh-pages on $remote"
