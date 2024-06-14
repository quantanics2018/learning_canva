
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const config = require('../Config/config');

const fs = require('fs');
const path = require('path');
const multer = require('multer');



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


// insert background images
async function insert_bimg(req,res){
    if (req.file) {
        console.log('File received:', req.file);
        res.json({status:true,code:200, message: 'File uploaded successfully', filename: req.file.filename });
      } else {
        console.log(req.file)
        console.log('No file received');
        res.json({status:false,code:500,message:'Error uploading file'});
      }
}
module.exports =  { background_img , canva_img , insert_bimg }; 