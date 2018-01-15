HOST     := localhost
LOGIN    := root
PASSWORD := root
DATABASE := database_development

all: install start

install: config/index.js config/config.json npm/install database-all
	
npm/%:
	npm $*

reinstall: db/drop clear/config/index.js clear/config/config.json clear/node_modules install
    
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

database-all: db/create db/migrate db/seed

database: db/create db/migrate db/seed

db/%: | config/config.json
	node_modules/.bin/sequelize db:$* $(ARGS)

migration/%:
	node_modules/.bin/sequelize migration:$* $(ARGS)

mysql:
	sudo /usr/local/mysql/bin/mysql -u root -p

clear/%:
	rm -rf ./$*

:DEFAULT_GOAL=all