'use strict';

var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
    etag: String,
    bucket: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bucket'
    }]
});

var File = mongoose.model('File', fileSchema);

module.exports = File;