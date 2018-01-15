HOST     := localhost
LOGIN    := root
PASSWORD := root
DATABASE := database_development

all: install start

install: config/index.js config/config.json
	npm install

reinstall: clear/config/index.js clear/node_modules install
    
start restart:
	DEBUG=strainer:* npm start

config/index.js: config/index.js.dist
	cp $< $@
	sed -i '' 's/HOST/$(HOST)/g' $@
	sed -i '' 's/LOGIN/$(LOGIN)/g' $@
	sed -i '' 's/PASSWORD/$(PASSWORD)/g' $@

config/config.json: config/config.json.dist
	cp $< $@
	sed -i '' 's/HOST/$(HOST)/g' $@
	sed -i '' 's/LOGIN/$(LOGIN)/g' $@
	sed -i '' 's/PASSWORD/$(PASSWORD)/g' $@
	sed -i '' 's/DATABASE/$(DATABASE)/g' $@

clear/%:
	rm -rf ./$*

:DEFAULT_GOAL=all