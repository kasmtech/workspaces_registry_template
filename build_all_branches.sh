#!/bin/sh

DEFAULT=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

mkdir base
cat > base/index.html << EOF
<meta http-equiv="refresh" content="0; url=./$DEFAULT/">
EOF
touch base/.nojekyll

# Generating documentation for each other branch in a subdirectory
echo "All branches:"
echo "$(git branch --remotes --format '%(refname:lstrip=3)' | grep -Ev '^(HEAD|develop|gh-pages)$')"
for BRANCH in $(git branch --remotes --format '%(refname:lstrip=3)' | grep -Ev '^(HEAD|develop|gh-pages)$'); do
    SANITIZED_BRANCH="$(echo $BRANCH | sed 's/\//_/g')"
    echo "$SANITIZED_BRANCH" >> base/versions.txt
    git checkout $BRANCH
    node processing
    cp -a public/. process
    npm run deploy --prefix site
    cp -a process/. public/ # Have to run it again because the deploy wipes the file and folders out
    rm -rf process
    mv public base/$SANITIZED_BRANCH
    cp base/$SANITIZED_BRANCH/favicon.ico base/favicon.ico
done

mv base public
