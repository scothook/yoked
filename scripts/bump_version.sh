#!/bin/bash

# Check if a version type (patch, minor, major) was provided
if [ -z "$1" ]; then
  echo "Usage: $0 [patch|minor|major] \"Commit message\""
  exit 1
fi

VERSION_TYPE=$1
COMMIT_MESSAGE=$2

# Run npm version without auto-committing
npm version $VERSION_TYPE --no-git-tag-version

# Extract the new version from package.json
NEW_VERSION=$(jq -r .version package.json)

# Commit with the provided message and version
git add package.json package-lock.json
git commit -m "Bump version to $NEW_VERSION: $COMMIT_MESSAGE"

# Create a Git tag
git tag "v$NEW_VERSION"

# Push changes and tags
git push origin main --tags

echo "✅ Version bumped to $NEW_VERSION and pushed to Git!"
