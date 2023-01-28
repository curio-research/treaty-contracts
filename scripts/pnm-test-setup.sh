set -e

if [ ! -d curio-vault ]; then
  git clone https://github.com/curio-research/treaty-vault.git curio-vault
fi
cd curio-vault
yarn
yarn build
yarn unlink || true; yarn link
cd ..
yarn link curio-vault
