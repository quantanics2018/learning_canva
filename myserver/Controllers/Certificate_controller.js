
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const config = require('../Config/config');

const fs = require('fs');
const path = require('path');



// background images
async function background_img(req,res){
    console.log("background image list geeting");
    const uploadsDir = path.join(__dirname, '../upload_img/background_img');
    console.log(uploadsDir);
    console.log("upload directory");
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
         res.json({status:false,message:'unable to read files'});
        }
        console.log(files);
        const images = files.map(file => ({ filename: file }));
        res.json({status:true,message:'background image lists',data:images});
    });
    // console.log(req);
    // res.json({status:true,message:'background image lists'});
}

// canva images
async function canva_img(req,res){
    console.log("canva image list geeting");
    const uploadsDir = path.join(__dirname, '../upload_img/image_canva');
    console.log(uploadsDir);
    console.log("canva upload directory");
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
         res.json({status:false,message:'unable to read canva images files '});
        }
        console.log(files);
        const images = files.map(file => ({ filename: file }));
        res.json({status:true,message:'canva  images lists',data:images});
    });
}
module.exports =  { background_img , canva_img }; 