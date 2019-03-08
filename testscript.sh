#/usr/bin/env/sh
set -e
components="front-end back-end"
cat "~travis/.my.cnf"

for component in $components
do
    echo "Testing component: $component"
    cd $component
    npm install
    npm test
    cd ..
done
