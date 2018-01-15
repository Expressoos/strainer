all: install start

install:
	npm install
    
start:
	DEBUG=strainer:* npm start

:DEFAULT_GOAL=all