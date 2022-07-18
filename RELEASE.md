# Read before A Release

## Procedure

- IMPORTANT: Verify that there is no sensitive information anywhere in the repository, such as private keys, except `.env`.
- Run `chmod +x scripts/release.sh` to give permission to executable, then run `./scripts/release.sh`. This script ports all relevant files and directories to `public` directory without deleting `.env` or other negative side effects.
- Make a new branch, push the changes by the executable onto the branch, and make a PR from the branch into `develop` branch as usual.
- Once the PR is merged and everything is ready to go, make a new PR from `develop` branch to `release` branch. Be cautious! All files and directories in `public` directory will be ported to our public repo.
- TODO: The last step needs to be updated with the Enhanced Git Flow, so that past versions are preserved as standalone branches.
