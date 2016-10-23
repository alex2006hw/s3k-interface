
'use strict';
const _ = require('lodash');
const async = require('async');
const validator = require('validator');
const request = require('request');
const path = require('path')
const AWS = require('aws-sdk')

let configPath = path.join(__dirname, '..', "config.json");
AWS.config.loadFromPath(configPath);

var s3 = new AWS.S3();

console.log('1.api called')
/**
 * GET /api/s3
 * S3 API example.
 */
exports.getS3 = (req, res, next) => {
  async.parallel({
      listObjects: (callback) => {
        console.log('1.api s3 listObjects')
          s3.listObjects({Bucket: "node-sdk-sample-19198238-2e4f-46a6-9300-3ecad6be68b2"}, (err, results) => {
              callback(err, results)
            });
          }  // listDirectory

    //   listBuckets: (callback) => {
    //       console.log('2.api listBuckets')
    //       s3.listBuckets(function(err, data) {
    //         if (err) console.log(err, err.stack); // an error occurred
    //         else     console.log(data);           // successful response
    //       });
    //   }, // listBuckets
    //   createBucket: (callback) => {
    //       console.log('3.api createBucket')
    //         s3.createBucket({Bucket: bucketName}, function() {
    //           var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    //                   s3.putObject(params, function(err, data) {
    //                     if (err)
    //                       console.log(err)
    //                     else
    //                       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    //               });
    //           }
    //   } // createBucket
  },
  (err, results) => {
    if (err) { return next(err); }
    res.render('api/s3', {
      title: 'S3 API',
      listObjects: results.listObjects,
    //   listBuckets: results.listBuckets,
    //   createBucket: results.createBucket
    });
  });
};
