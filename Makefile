LOGIN    := root
PASSWORD := root
HOST := localhost
DATABASE := database_development
SEQUELIZE := node_modules/.bin/sequelize

all: install start

install: config npm/install database-all

config: config/index.js config/config.json 
	
npm/%:
	npm $*

reinstall: database-clean clear/config/index.js clear/config/config.json clear/node_modules install
    
start restart:
	DEBUG=strainer:* npm start

config/index.js: config/index.js.dist
	cp $< $@
	sed -i '' 's/HOST/$(HOST)/g' $@
	sed -i '' 's/LOGIN/$(LOGIN)/g' $@
	sed -i '' 's/PASSWORD/$(PASSWORD)/g' $@
	sed -i '' 's/DATABASE/$(DATABASE)/g' $@

config/config.json: config/config.json.dist
	cp $< $@
	sed -i '' 's/HOST/$(HOST)/g' $@
	sed -i '' 's/LOGIN/$(LOGIN)/g' $@
	sed -i '' 's/PASSWORD/$(PASSWORD)/g' $@
	sed -i '' 's/DATABASE/$(DATABASE)/g' $@

database-all: db/create db/migrate seed/all
	
database-clean: 
ifneq ("$(wildcard config/config.json)","")
	$(MAKE) db/drop
endif

db/%:
	$(SEQUELIZE) db:$* $(ARGS)

seed/%:
	$(SEQUELIZE) db:seed:$* $(ARGS)

migration/%:
	$(SEQUELIZE) migration:$* $(ARGS)

model/%:
	$(SEQUELIZE) model:$* $(ARGS)

mysql:
	sudo /usr/local/mysql/bin/mysql -u root -p

clear/%:
	rm -rf ./$*

:DEFAULT_GOAL=all