var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );

var Employee = mongoose.model('Employee');
var Position = mongoose.model('Position');
var Subdivision = mongoose.model('Subdivision');


function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware

// router.use('/employee', isAuthenticated);
// router.use('/position', isAuthenticated);
// router.use('/subdivision', isAuthenticated);

router.route('/employee')
	//creates a new post
	.post(function(req, res){

		var employee = new Employee();
		employee.surname = req.body.surname;
		employee.name = req.body.name;
		employee.patronymic = req.body.patronymic;
		employee.email = req.body.email;
		employee.position = req.body.position._id;
		employee.subvision = req.body.subvision._id;
		employee.number = req.body.number;
		employee.save(function(err, employee) {
			if (err){
				return res.send(500, err);
			}
			return res.json(employee);
		});
	})
	//gets all posts
	.get(function(req, res){
		
		Employee
			.find()
			.sort({created_at: 'desc'})		
			.populate('position')
			.populate('subvision')
			.exec(function (err, employee) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, employee);
			});
	});

//post-specific commands. likely won't be used
router.route('/employee/:id')
	//gets specified post
	.get(function(req, res){
		Employee
			.findById(req.params.id)
			.sort({created_at: 'desc'})		
			.populate('position')
			.populate('subvision')
			.exec(function (err, employee) {
				if(err){
					return res.send(500, err);
				}			
				return res.send(200, employee);
			});
	
	}) 
	//updates specified post
	.put(function(req, res){
		Employee.findById(req.params.id, function(err, employee){
			if(err)
				res.send(err);

			employee.surname = req.body.surname;
			employee.name = req.body.name;
			employee.patronymic = req.body.patronymic;
			employee.email = req.body.email;
			employee.position = req.body.position._id;
			employee.subvision = req.body.subvision._id;
			employee.number = req.body.number;

			employee.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})
	//deletes the post
	.delete(function(req, res) {
		Employee.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});
router.route('/subdivision')
	//creates a new post
	.post(function(req, res){

		var subdivision = new Subdivision();
		
		subdivision.name = req.body.name;
		
		subdivision.save(function(err, subdivision) {
			if (err){
				return res.send(500, err);
			}
			return res.json(subdivision);
		});
	})
	//gets all posts
	.get(function(req, res){
		
		Subdivision.find(function(err, subdivisions){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200, subdivisions);
		});
	});

//post-specific commands. likely won't be used
router.route('/subdivision/:id')
	//deletes the post
	.delete(function(req, res) {
		Subdivision.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			return res.send(200, null);
		});
	});

router.route('/position')
	//creates a new post
	.post(function(req, res){

		var position = new Position();
		position.name = req.body.name;	
		
		position.save(function(err, position) {
			if (err){
				return res.send(500, err);
			}
			return res.json(position);
		});
	})
	//gets all posts
	.get(function(req, res){
		
		Position.find(function(err, positions){
			console.log('debug2');
			if(err){
				return res.send(500, err);
			}
			return res.send(200,positions);
		});
	});

//post-specific commands. likely won't be used
router.route('/position/:id')
	//deletes the post
	.delete(function(req, res) {
		console.log("ятут")
		Position.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			return res.send(200, null);
		});
	});
module.exports = router;