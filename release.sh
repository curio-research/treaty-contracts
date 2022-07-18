#/bin/zsh

# save `.env`
mv .env ../.env.saved

# remove all files and directories specified in `.gitignore`
git clean -fxd

# create new `public` directory
rm -r public
mkdir public

# clone repo there and remove unnecessary files and directories
cp -r . public
cd public; rm -r public; rm -r .git; rm -r .github; rm release.sh; cd ..

# restore `.env`
mv ../.env.saved .env

# restore `node_modules` and `out`
yarn
yarn ft