module.exports = function(router){


    router.get('/', function(req, res){

        res.render('index.ejs');
    });

    router.get('/signup', function(req, res){

        res.render('auth/signup.ejs');
    });

    router.get('/login', function(req, res){

        res.render('auth/login.ejs');
    });

    router.get('/logout', function(req, res){
        req.logout();
        req.flash('success_msg', 'You are logged out !');

        res.redirect('/');
    });

}
