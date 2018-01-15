HOST     := localhost
LOGIN    := root
PASSWORD := root

all: install start

install: config/index.js
	npm install

reinstall: clear/config/index.js clear/node_modules install
    
start restart:
	DEBUG=strainer:* npm start

config/index.js: config/index.js.dist
	cp $< $@
	sed -i '' 's/HOST/$(HOST)/g' $@
	sed -i '' 's/LOGIN/$(LOGIN)/g' $@
	sed -i '' 's/PASSWORD/$(PASSWORD)/g' $@

clear/%:
	rm -rf ./$*

:DEFAULT_GOAL=all