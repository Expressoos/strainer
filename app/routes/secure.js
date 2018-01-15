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

    res.render('secured/dashboard.ejs');
  });

  router.get('/*', function(req, res){

    res.redirect('/dashboard');
  });


}
