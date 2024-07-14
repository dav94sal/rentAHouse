#!/usr/bin/bash

PACKAGES=("cookie-parser" "cors" "csurf" "dotenv" "express" "express-async-errors" "helmet" "jsonwebtoken" "morgan" "per-env" "sequelize@6" "sequelize-cli@6" "pg")

DEPENDENCIES=('sqlite3' 'dotenv-cli' 'nodemon')

for package in "${packages[@]}"; do
  npm install "$package"
done

for dependency in "${dependencies[@]}"; do
  npm install -D "$dependency"
done

echo "All required packages and dependencies installed successfully!"
