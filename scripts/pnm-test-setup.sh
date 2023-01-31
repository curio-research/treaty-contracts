#!/bin/bash

set -e

dirname="$( dirname -- "$0"; )";

# Install treaty-vault
if [ ! -d curio-vault ]; then
  git clone https://github.com/curio-research/treaty-vault.git curio-vault
fi
cd curio-vault
# Need prod=false to install devDeps
yarn install --production=false
yarn build
yarn unlink || true; yarn link
cd ..
yarn link curio-vault

# Setup env
cp $dirname/../.env.pnm $dirname/../.env
