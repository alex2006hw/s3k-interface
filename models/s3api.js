const _ = require('underscore')
const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const flow = require('flow')
const File = require('./files')
let configPath = path.join(__dirname, '..', "config.json");

 AWS.config.loadFromPath(configPath);
 exports.s3 = function(req, res) {
	 console.log('req.url!!!!: ',req.url)
	 console.log('req.url!!!!:')
 	var s3 = new AWS.S3(),
 		file = req.file,
 		result = {
 			error: 0,
 			uploaded: []
 		};
 	flow.exec(
 		function() { // Read temp File
 			fs.readFile(file.path, this);
 		},
 		function(err, data) { // Upload file to S3
 			s3.putObject({
 				Bucket: 'demo-yo', //Bucket Name
 				Key: file.originalname, //Upload File Name, Default the original name
 				Body: data
 			}, this);
 		},
 		function(err, data) { //Upload Callback
 			if (err) {
 				console.error('Error : ' + err);
 				result.error++;
 			}
			 var ETag = data.ETag.split('"')[1]
			 let file = new File({
				url: ETag,
				bucket: 'bucket'
			});
			file.save(function(err, favedFile) {
				res.json(favedFile)
			});
 		})
 };
