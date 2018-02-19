#!/usr/bin/env bash
set -e

[ -z "$FIREBASE_TOKEN" ] && echo "Must set FIREBASE_TOKEN" && exit 1;

node_modules/.bin/next build;
node_modules/.bin/next export;
node_modules/.bin/firebase deploy --token $FIREBASE_TOKEN;
