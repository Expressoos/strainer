module.exports = function(router, fakeUsers){


    router.get('/', function(req, res){

        res.render('index.ejs');
    });

    router.get('/signup', function(req, res){

        res.render('auth/signup.ejs');
    });

    router.get('/login', function(req, res){
      console.log('login req.session.email : ' + req.session.email);
      if (req.session.email == 'aa' && req.session.password == 'aa'){

          res.redirect('/dashboard');
      }

      res.render('auth/login.ejs');
    });

    router.post('/login', function(req, res){
      var msg = '';

      if(req.body.email != 'undefined' && req.body.email != ''){

      }

      if (req.body.email == 'aa' && req.body.password == 'aa'){

        var email = req.body.email;
        var password = req.body.password;

        /*var q = db.query("SELECT * FROM `users` WHERE `email`='" + req.params.email + "' AND `password`='" + req.params.password + "'");
        if (q) {
          // Set the sessions.
          req.session.email = req.params.email;
          req.session.password = req.params.password;
        }*/
        req.session.email = email;
        req.session.password = password;

        res.redirect('/dashboard');

      } else {
        console.log('**** vide');
      }

      res.render('auth/login.ejs');
    });

    router.get('/logout', function(req, res){

        console.log('logout');
        //req.logout();
        req.session = null;

        res.redirect('/');
    });

}
