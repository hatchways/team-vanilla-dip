aws = require('aws-sdk')
express = require('express')
multer = require('multer')
multerS3 = require('multer-s3');
const asyncHandler = require("express-async-handler");
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ca-central-1'
});
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"||file.mimetype === "image/gif" ||file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};
const upload = multer({fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'team-vanilla-dip',
        key: function (req, file, cb) {
            cb(null, Date.now().toString()+'.'+file.originalname.split('.').pop());
        },metadata: function (req, file, cb) {
            cb(null, { fieldName: "TESTING_METADATA" });
        },
    })
});


exports.uploadImage =  asyncHandler ((req, res)=> {
    upload.single("image")(req, res, function (err) {
        if (err) {
            return res.json({
                error: { message: err.message }
            });
        }
        res.json({
            success: req.file.location
        })
    });
})


