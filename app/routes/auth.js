var database = require('../../services/database')

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

      res.render('auth/login.ejs', {msg: ""});
    });

    router.post('/login', function(req, res){
      var msg = '';

      if(typeof req.body.email !== 'undefined' && req.body.email !== ''){

        var email = req.body.email;
        var password = req.body.password;

        var connection = database.dbConnect();
        connection.connect(function(err) {
            if (err) throw err

            console.log('You are now connected...')
            //connection.query("SELECT * FROM `Users` WHERE `email`='" + email + "'", function(err, results) {

            var query = "SELECT * FROM `Users` WHERE `email`='" + email + "' AND `password`='" + password + "'";
            console.log(query);

            connection.query(query, function(err, results) {
              console.log('***')
              console.log(err)
              console.log(results)

              if (typeof results[0] !== 'undefined' ) {
                req.session.id = results[0].id;
                req.session.email = email;
                req.session.password = password;

                res.redirect('/dashboard');
              } else {
                console.log("Erreur de mot de passe")
                res.render('auth/login.ejs', {msg: "Erreur de connexion !"});
              }

              /* bloc avec secure

              if (err) throw err
              if (typeof results[0] !== 'undefined' ) {
                      if (results[0].password === password) {
                          //console.log(results[0]);
                          // Set the sessions.
                          req.session.id = results[0].id;
                          req.session.email = email;
                          req.session.password = password;

                          res.redirect('/dashboard');
                      }
                      else {
                          console.log("Erreur de mot de passe")
                      }
                } else {
                      console.log('**** vide');
                }

                */

              res.render('auth/login.ejs', {msg: "Erreur de connexion !"});
            })
          })
        } else {
            res.render('auth/login.ejs', {msg: "email or password"});
        }
    });

    router.get('/logout', function(req, res){

        console.log('logout');
        //req.logout();
        req.session = null;

        res.redirect('/');
    });

}
