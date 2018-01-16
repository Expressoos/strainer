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

  	var connection = database.dbConnect();

    connection.connect(function(err) {
        if (err) throw err

        console.log('You are now connected...')
        //connection.query("SELECT * FROM `Users` WHERE `email`='" + email + "'", function(err, results) {

        var query = "SELECT * FROM `Articles`";
        console.log(query);

        connection.query(query, function(err, results) {
        	if (err) throw err

			res.render('secured/dashboard.ejs', {data: results});
		});

  	});
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

	var title = req.body.title;
	var text = req.body.text;
	var userId = req.body.userId;
       var createdAt = '2015-12-03';
        var updatedAt = '2015-12-03';

	console.log(title)
	console.log(text)
	console.log(userId)

	var connection = database.dbConnect();

    connection.query("INSERT INTO Articles (title, text, createdAt, updatedAt, user_id) VALUES ('" + title + "','" + text + "','" + createdAt + "','" + updatedAt + "'," + userId + ")" , function(err, results) {
		if (err) throw err

		console.log(results)

		if(results) {
			res.redirect('/dashboard');

	    } else {
	        res.render('secured/post/add.ejs');
	    }    
	});
  		
  });

  router.get('/*', function(req, res){

    res.redirect('/dashboard');
  });


}
