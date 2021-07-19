aws = require('aws-sdk')
express = require('express')
multer = require('multer')
multerS3 = require('multer-s3');

aws.config.update({
    secretAccessKey: 'process.env.AWS_SECRET_ACCESS_KEY',
    accessKeyId: 'process.env.AWS_ACCESS_KEY_ID',
    region: 'ca-central-1'
});
const s3 = new aws.S3();

exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'team-vanilla-dip',
        key: function (req, file, cb) {
            cb(null, Date.now());
        }
    })
});


