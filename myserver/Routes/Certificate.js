const express = require('express');
const router = express.Router();
const certificate_controller  = require('../Controllers/Certificate_controller');
const { Certificate } = require('crypto');


router.post('/bimg',certificate_controller.background_img);
router.post('/cimg',certificate_controller.canva_img);


module.exports = router;