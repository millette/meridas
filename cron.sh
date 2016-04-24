#!/bin/sh

cd dist
yesterday=`date --date=yesterday +"%Y-%m-%d"`
mv index.html $yesterday.html
cd -

cd working
mv day-two.json day-one.json
../node_modules/.bin/star-where millette -n 50 > day-two.json
cd -

npm run make
rsync -vaPS dist/* rollodeqc.com:/var/local/www/meridas.rollodeqc.com/public/millette/
