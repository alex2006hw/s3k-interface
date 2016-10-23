'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");
let bucketSchema = new mongoose.Schema({
    name: String,
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }],
    infos: Object
});


let Bucket = mongoose.model('Bucket', bucketSchema);

module.exports = Bucket;