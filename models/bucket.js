'use strict';

var mongoose = require('mongoose');

var bucketSchema = new mongoose.Schema({
    name: String,
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    infos: Object
});

var Bucket = mongoose.model('Bucket', bucketSchema);

module.exports = Bucket;