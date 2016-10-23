'use strict';

var express = require('express');
var router = express.Router();

var express = require('express'),
	multer = require('multer'),
	http = require('http'),
	path = require('path'),
	router = express.Router();

var Bucket = require('../models/bucket');

var upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        filesize: 1000000 * 10
    }
});

router.post('/file',upload.single('newFile'), function(req, res){
  console.log('req.file: ', req.file);
});

module.exports = router;