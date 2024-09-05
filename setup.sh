#!/bin/bash

echo "🌱 Initiating..."

pnpm install

cd apps/api && (
  pnpm install --silent
  cp -n .env.example .env || true
  echo "📦 (api): Dependencies installed."
)

cd ../desktop && (
  pnpm install --silent
  cp -n .env.example .env || true
  echo "📦 (desktop): Dependencies installed."
)

cd ../web && (
  pnpm install --silent
  cp -n .env.example .env.local || true
  echo "📦 (web): Dependencies installed."
)

echo "Setup complete! ✨🐝"
echo "⚠️ Remember to fill out the .env files for each app with your own values! ⚠️"
