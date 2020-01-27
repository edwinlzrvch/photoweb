const express = require('express');
const { Photo } = require('./models');
const uniqid = require('uniqid');
const router = express.Router();

router.get('/getPhotos', (req, res) => {
    Photo.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        res.send(JSON.stringify(data));
    });
});

router.post('/addPhoto', (req, res) => {
    const newPhoto = new Photo({
        photoID: uniqid(),
        src: req.body.src,
        height: req.body.height,
        width: req.body.width
    });
    newPhoto.save((err) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.send(JSON.stringify(newPhoto));
    });
});

router.post('/deletePhoto', (req, res) => {
    Photo.findOneAndDelete({photoID: req.body.photoID}, {
        photoID: req.body.photoID,
        src: req.body.src,
        height: req.body.height,
        width: req.body.width
    }, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.send(data);
    });
});

exports.AdminController = router;

