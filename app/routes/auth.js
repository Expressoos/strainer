module.exports = function(router, fakeUsers){


    router.get('/', function(req, res){

        res.render('index.ejs');
    });

    router.get('/signup', function(req, res){

        res.render('auth/signup.ejs');
    });

    router.get('/login', function(req, res){

        res.render('auth/login.ejs');
    });

    router.post('/login', function(req, res){

      console.log(fakeUsers.user);


      //console.log('ok');

      //console.log(req);

      res.render('auth/login.ejs');
            /*successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
            */
    });




    router.get('/logout', function(req, res){
        req.logout();
        req.flash('success_msg', 'You are logged out !');

        res.redirect('/');
    });

}
