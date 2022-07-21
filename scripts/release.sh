#/bin/zsh

# save `.env`
mv .env ../.env.saved

# remove all files and directories specified in `.gitignore`
git clean -fxd

# create new `public` directory
rm -rf public
mkdir public

# clone repo there and remove unnecessary files and directories
cp -r . public
cd public; rm -rf public; rm -rf .git; rm -rf .github; rm -rf scripts; rm -rf tasks; rm RELEASE.md; cd ..

# restore `.env`
mv ../.env.saved .env

# restore `node_modules` and `out`
yarn
yarn ft