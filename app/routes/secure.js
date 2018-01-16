var fakeData = require('../../config/fakeData');
var database = require('../../services/database');

module.exports = function(router){

  /**
  * route pour protéger le reste des routes
  */
  router.use(function(req, res, next){
    /*if(req.isAuthenticated()){
      return next();
    }*/
    console.log('req.session.email : ' + req.session.email);
    if (req.session.email != undefined && req.session.password != undefined){
      return next();
    }

    res.redirect('/auth');
  });

  router.get('/dashboard', function(req, res){

    console.log(fakeData);
    res.render('secured/dashboard.ejs', {data: fakeData});
  });

  router.get('/read/:id', function(req, res){
    var id = req.params.id;

    res.render('secured/post/read.ejs', {data: fakeData[id]});
  });

  router.get('/modify/:id', function(req, res){
    var id = req.params.id;

    res.render('secured/post/modify.ejs', {data: fakeData[id]});
  });

  router.get('/delete/:id', function(req, res){
    var id = req.params.id;

    res.render('secured/post/delete.ejs', {data: fakeData[id]});
  });

  router.get('/add', function(req, res){

    res.render('secured/post/add.ejs', {userid: req.session.id });
  });

  router.post('/add', function(req, res){
    console.log(req.body);
    if(typeof req.body.email !== 'undefined' && req.body.email !== ''){

      var title = req.body.title;
      var text = req.body.text;
      var userid = req.body.userid;

      /*var connection = database.dbConnect();
      connection.connect(function(err) {
          if (err) throw err

          console.log('You are now connected...')
          connection.query("SELECT * FROM `Users` WHERE `email`='" + email + "'", function(err, results) {

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

              res.render('auth/login.ejs');
          })
        })*/

      res.redirect('/dashboard');

    } else {
        res.render('secured/post/add.ejs');
    }

  });

  router.get('/*', function(req, res){

    res.redirect('/dashboard');
  });


}
