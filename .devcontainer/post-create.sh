#!/usr/bin/env bash
set -euo pipefail

workspace_dir="${CONTAINER_WORKSPACE_FOLDER:-/workspaces/project}"

# Installs npm dependencies for a directory, but only when package-lock.json
# has actually changed since the last successful install: a lockfile-hash
# marker avoids re-running npm ci (and needing network access) on every
# container rebuild when nothing changed. --prefer-offline lets a partial
# npm cache still work when offline.
npm_ci_if_stale() {
  local dir="$1"
  local lockfile="$dir/package-lock.json"
  local node_modules_dir="$dir/node_modules"
  local marker_file="$dir/.npm-ci-lock.sha256"

  if [[ ! -f "$lockfile" ]]; then
    return 0
  fi

  local lock_hash marker_hash=""
  lock_hash="$(sha256sum "$lockfile" | awk '{print $1}')"
  if [[ -f "$marker_file" ]]; then
    marker_hash="$(cat "$marker_file" 2>/dev/null || true)"
  fi

  if [[ -d "$node_modules_dir" && "$marker_hash" == "$lock_hash" ]]; then
    echo "[devcontainer] $dir: dependencies already in sync with package-lock.json."
    return 0
  fi

  echo "[devcontainer] $dir: installing dependencies (npm ci)."
  if (cd "$dir" && npm ci --ignore-scripts --prefer-offline --no-audit --no-fund); then
    printf '%s\n' "$lock_hash" > "$marker_file"
  elif [[ -d "$node_modules_dir" ]]; then
    echo "[devcontainer] WARNING: npm ci failed in $dir, reusing existing node_modules."
  else
    echo "[devcontainer] WARNING: npm ci failed in $dir and node_modules is missing."
    echo "[devcontainer] Connect to the internet and run: cd $dir && npm ci --ignore-scripts"
  fi
}

npm_ci_if_stale "$workspace_dir"
npm_ci_if_stale "$workspace_dir/docs/site"

if [[ -x "$workspace_dir/node_modules/.bin/husky" ]]; then
  (cd "$workspace_dir" && "node_modules/.bin/husky")
else
  echo "[devcontainer] Skipping husky setup: node_modules/.bin/husky is unavailable (install root deps first)."
fi
