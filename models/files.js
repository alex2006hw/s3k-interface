'use strict';

let mongoose = require('mongoose');
let relationship = require("mongoose-relationship");
let fileSchema = new mongoose.Schema({
    etag: String,
    bucket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bucket',
        childPath:"files"
    }
});
fileSchema.plugin(relationship, { relationshipPathName:'bucket' });

let File = mongoose.model('File', fileSchema);
module.exports = File;