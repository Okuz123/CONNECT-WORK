#!/usr/bin/env bash
set -e
echo "Starting CONNECT WORK in dev mode..."
( cd server && npm run dev ) &
SERVER_PID=$!
( cd apps/web && npm run dev ) &
WEB_PID=$!
trap "kill $SERVER_PID $WEB_PID" EXIT
wait
