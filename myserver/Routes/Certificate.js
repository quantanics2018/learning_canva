const express = require('express');
const router = express.Router();
const certificate_controller  = require('../Controllers/Certificate_controller');
const { Certificate } = require('crypto');
const multer = require('multer');


// storage images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload_img/background_img/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });



// retrive image
router.post('/bimg',certificate_controller.background_img);
router.post('/cimg',certificate_controller.canva_img);

// insertion image
router.post('/upload_img/background_img',upload.single('image'),certificate_controller.insert_bimg);


module.exports = router;