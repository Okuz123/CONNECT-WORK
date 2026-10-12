#!/usr/bin/env bash
set -e
echo "Installing web dependencies..."
( cd apps/web && npm install )
echo "Installing server dependencies..."
( cd server && npm install )
echo "Done."
