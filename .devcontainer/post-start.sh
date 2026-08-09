#!/usr/bin/env bash
set -euo pipefail

workspace_dir="${CONTAINER_WORKSPACE_FOLDER:-/workspaces/project}"

# Keep SSH mount permissions sane for tools that require strict key perms.
chmod 700 /home/node/.ssh 2>/dev/null || true
chmod 600 /home/node/.ssh/* 2>/dev/null || true

cd "$workspace_dir"

if docker info >/dev/null 2>&1; then
  echo "[devcontainer] Docker is available."
else
  echo "[devcontainer] WARNING: Docker socket is not accessible from inside the dev container."
  echo "[devcontainer]"
  echo "[devcontainer] Fix on host:"
  echo "[devcontainer]   sudo usermod -aG docker \"$USER\""
  echo "[devcontainer]   log out/in fully, then Rebuild Container"
  echo "[devcontainer]"
  echo "[devcontainer] Diagnostic info:"
  id || true
  ls -l /var/run/docker.sock || true
fi
