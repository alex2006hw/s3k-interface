'use strict';

var express = require('express');
var router = express.Router();

var express = require('express'),
	multer = require('multer'),
	http = require('http'),
	path = require('path'),
	router = express.Router(),
	upload = require('../models/upload');

var Bucket = require('../models/bucket');

// var uploader = multer({
//     storage: multer.memoryStorage()
// });
var uploader = multer({
	dest: 'uploads/'
});

router.post('/file', uploader.single('file-upload-btn'), upload.s3);

module.exports = router;