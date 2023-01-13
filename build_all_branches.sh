#!/bin/sh

DEFAULT=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

mkdir base
cat > base/_redirects << EOF
/ /$DEFAULT/ 301
/index.html /$DEFAULT/index.html 301
EOF

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
