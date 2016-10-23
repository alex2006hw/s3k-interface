'use strict';

let express = require('express'),
	multer = require('multer'),
	http = require('http'),
	path = require('path'),
	router = express.Router(),
	File = require('../models/files'),
	Bucket = require('../models/bucket'),
	s3api = require('../models/s3api');

	const _ = require('lodash');
	const async = require('async');
	const validator = require('validator');
	const request = require('request');
	const AWS = require('aws-sdk')

	let configPath = path.join(__dirname, '..', "config.json");
	AWS.config.loadFromPath(configPath);

	var s3 = new AWS.S3();

	console.log('1.s3 called')

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

	let bucketName = req.params.name
	var params = {
		  Bucket: bucketName, /* required */
		  ACL: 'public-read',
		//   CreateBucketConfiguration: {
		//     LocationConstraint: 'us-west-1'
		//   },
		//   GrantFullControl: 'true',
		//   GrantRead: 'true',
		//   GrantReadACP: 'true',
		//   GrantWrite: 'true',
		//   GrantWriteACP: 'true'
	};
s3.createBucket(params, function(err, data) {
  if (err) console.log('1.s3 api createBucket err: ',err,' stack: ', err.stack); // an error occurred
  else     console.log('2.s3 api createBucket: ',data);           // successful response
});
	// // create bucket and send the name back
	// console.log(req.params.name)
	//
	// let bucket = new Bucket({
	// 	name: bucketName
	// });
	// bucket.save(function(err, favedBucket) {
	// 	console.log('favedBucket: ', favedBucket)
	// 	res.json(favedBucket)
	// });
});

router.get('/bucket/all', (req, res) => {
	      console.log('1.api listBuckets')
	      s3.listBuckets(function(err, data) {
	        if (err) {
				console.log(err, err.stack);
			} // an error occurred
	        else    { console.log('2.api listBuckets data: ',data);
					res.status(200).send(data) }          // successful response
	      }
	  );
	// Bucket.find({}, function(err, buckets){
	// })
});
router.get('/bucket/:id', function(req, res){
	let bucketId = req.params.id
	res.render('bucket');
});
router.get('/file/bucket/:data', function(req, res){
	let bucketName = req.params.split('@')[0]
	let owenderId = req.params.split('@')[1]
	var params = {
	  Bucket: bucketName,
	  Delimiter: 'STRING_VALUE',
	  EncodingType: 'url',
	};

	console.log('2.api list Objects params: ', params)

	s3.listObjectsV2(params, function(err, data) {
		console.log('1.listObjects data: ', data)
	  if (err) {
		  console.log(err, err.stack);
	  	} // an error occurred
	  else    {
		  console.log('2.api listObjects data: ',data);
		  res.status(200).send(data)          // successful response
	  	}
	}); // listObjects
}); // router.get

router.delete('/bucket/:data', function(req, res){
	// get one bucket and send the details back
	let bucketName = req.params.split('@')[0]
	let ownerId = req.params.split('@')[1]
	var params = {
  Bucket: 'STRING_VALUE' /* required */
};
s3.deleteBucket(params, function(err, data) {
  if (err) { console.log('1.s3 api deleteBucket err: ', err,' stack: ', err.stack); res.send(500) } // an error occurred
  else    { console.log(data); res.status(200).send('good') }           // successful response
});
	// Bucket.remove({_id: req.params.id}, function(err, good){
	// 	console.log('good')
	// 	if (err){
	// 		res.send(500)
	// 	}
	// 	res.status(200).send('good')
	// })
});


module.exports = router;
