
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const config = require('../Config/config');
const token_obj = require('../Middlewares/authMiddleware');
const db_res = require('../Models/userModel');


async function  login(req, res){
  console.log("auth controller calling");
  const userId = 1; // Sample user ID

  // 
  const db_out = await db_res.getuseData(req.body.user_data);
  if (db_out.status===true) {
    const token = await token_obj.generateToken(db_out.data[0]);
    console.log("login success");
    console.log(db_out.data[0]);
    const final_res = {
      'token':token,
      'user_id':db_out.data[0].user_id,
    }
    res.json({status:true,message:'Login Success !!',data:final_res});
  }
  else if(db_out.status===false){
    res.json({status:false,message:'Login Failed !!'});
  }
  console.log("login_data");
  console.log(db_out);
};

async function getdata(req,res){
  res.json(req.body);
  console.log("controller post method working fine");
}


async function signup(req,res){
  let email = req.body.user_data.email
  const check_email = await db_res.check_user_exists(email);
  console.log("controller output");
  if (check_email) {
    res.json({status:false,message:"Already Existing user !!"});
  }else{
    console.log(req.body.user_data);
   
    const insert_status = await db_res.signup_user(req.body.user_data);
    if (parseInt(insert_status)>0) {
      res.json({status:true,message:'New user Insertion Successfully'});
    }else{
      res.json({status:false,message:'Error New user Insertion'});
    }
    console.log(insert_status);
  }
  console.log("routes in user registertion is runing ...");
}

module.exports = { login , getdata , signup};
