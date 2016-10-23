'use strict';

let express = require('express'),
	multer = require('multer'),
	http = require('http'),
	path = require('path'),
	router = express.Router(),
	File = require('../models/files'),
	Bucket = require('../models/bucket'),
	s3api = require('../models/s3api');

// let uploader = multer({
//     storage: multer.memoryStorage()
// });

router.get('/file/all', function(req, res){
	File.find({}, function(err, files){
		console.log('files: ', files)
		if (err){
			res.send(500)
		}
		res.status(200).send(files)
	})
});
router.get('/file/:id', function(req, res){
	File.findById(req.params.id, function(err, file){
		console.log('file: ', file)
		if (err){
			res.send(500)
		}
		res.status(200).send(file)
	})
});
router.delete('/file/:id', function(req, res){
	// get one bucket and send the details back
	File.remove({_id: req.params.id}, function(err, good){
		console.log('good')
		if (err){
			res.send(500)
		}
		res.status(200).send('good')
	})
});
let uploader = multer({
	dest: 'uploads/'
});

router.post('/file', uploader.single('newFile'), s3api.s3);

// file
// ##################
// ##################
// ##################
// ##################
// bucket

router.post('/bucket/:name', function(req, res){
	// create bucket and send the name back
	console.log(req.params.name)
	let bucketName = req.params.name
	let bucket = new Bucket({
		name: bucketName
	});
	bucket.save(function(err, favedBucket) {
		console.log('favedBucket: ', favedBucket)
		res.json(favedBucket)
	});
});
router.get('/bucket/all', function(req, res){
	Bucket.find({}, function(err, buckets){
		console.log('buckets: ', buckets)
		if (err){
			res.send(500)
		}
		res.status(200).send(buckets)
	})
});
router.get('/bucket/:id', function(req, res){
	let bucketId = req.params.id
	res.render('bucket');
});
router.get('/file/bucket/:id', function(req, res){
	let bucketId = req.params.id
	console.log('bucketId: ', bucketId)
	File.find({bucket: {$in: [bucketId]}}, function(err, files){
		console.log('files: ', files)
		if (err) {
			return res.sendStatus(200)
		}
		res.status(200).send(files)
	})
});
router.delete('/bucket/:id', function(req, res){
	// get one bucket and send the details back
	Bucket.remove({_id: req.params.id}, function(err, good){
		console.log('good')
		if (err){
			res.send(500)
		}
		res.status(200).send('good')
	})
});


module.exports = router;