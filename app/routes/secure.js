var fakeData = require('../../config/fakeData');

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

  router.get('/*', function(req, res){

    res.redirect('/dashboard');
  });


}
