Strainer
========

App to test pen.

Database
========

1. Download mysql [here](https://dev.mysql.com/downloads/file/?id=472883);
2. DON'T CLOSE MODAL AND COPY/PASTE PASSWORD;
3. Start mysql with `cmd+space` > mysql;
4. `sudo /usr/local/mysql/bin/mysql -u root -p`;
    * YOUR PC PASSWORD IS THE FIRST PASSWORD;
    * Second is the password given at install;
    * change your password with : `ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword'`.
5. Add it to top of Makefile, by default it's root;
6. Do a `make`.

Use squelize
============

Package squelize, squelize-cli & mysql2 allow use to create model for express app.

The file conf/config.json contain configuration for database and for squelize:

`

`

Install & start
===============

make

Command
=======

make reinstall
make stop
make start
make restart

Are all command eponyme of its functionnality :)