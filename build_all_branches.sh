#!/bin/sh

DEFAULT=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

mkdir base
cat > base/index.html << EOF
<meta http-equiv="refresh" content="0; url=./$DEFAULT/">
EOF
touch base/.nojekyll

# Generating documentation for each other branch in a subdirectory
for BRANCH in $(git branch --remotes --format '%(refname:lstrip=3)' | grep -Ev '^(HEAD|develop|gh-pages)$'); do
    echo "$BRANCH" >> base/versions.txt
    git checkout $BRANCH
    node processing
    cp -a public/. process
    npm run deploy --prefix site
    cp -a process/. public/ # Have to run it again because the deploy wipes the file and folders out
    rm -rf process
    mv public base/$BRANCH
done

mv base public
