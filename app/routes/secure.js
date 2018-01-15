module.exports = function(router){


    router.get('/', function(req, res){

        res.render('index.ejs');
    });

    router.get('/login', function(req, res){

        res.render('auth/login.ejs');
    });



}
