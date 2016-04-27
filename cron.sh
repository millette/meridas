#!/bin/sh

yesterday=`date --date=yesterday +"%Y-%m-%d"`
cd /home/millette/meridas/
mv dist/index.html dist/$yesterday.html

mv working/day-two.json working/day-one.json
. /home/millette/.exports
./node_modules/.bin/star-where millette -n 50 > working/day-two.json

npm run make
export SSH_AUTH_SOCK=$( ls /tmp/ssh-*/agent* )
rsync -vaPS dist/* rollodeqc.com:/var/local/www/meridas.rollodeqc.com/public/millette/
