#!/bin/sh

cd /home/millette/meridas/dist/
yesterday=`date --date=yesterday +"%Y-%m-%d"`
mv index.html $yesterday.html

cd ../working
mv day-two.json day-one.json
. /home/millette/.exports
../node_modules/.bin/star-where millette -n 50 > day-two.json

cd ..
npm run make
export SSH_AUTH_SOCK=$( ls /tmp/ssh-*/agent* )
rsync -vaPS dist/* rollodeqc.com:/var/local/www/meridas.rollodeqc.com/public/millette/
