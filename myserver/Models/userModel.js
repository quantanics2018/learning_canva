const Pool = require('pg').Pool;
const config = require('../Config/config');

const dbcon = new Pool(config.pgsql);

async function getuseData(login_data){
  // const query = `;`;
  const check_login_satus = await dbcon.query('SELECT * FROM users_tb WHERE user_email=$1 AND password=$2;',[login_data.email,login_data.password]);
  let login_data_obj= {};
  if (parseInt(check_login_satus.rowCount)>0) {
    login_data_obj['status'] = true;
    login_data_obj['data'] = check_login_satus.rows;
  }else{
    login_data_obj['status'] = false;
    login_data_obj['data'] = 'empty_data';
  }

  return login_data_obj;
};

// check if its already exists or not 
async function check_user_exists(email){

  const check_mail_status = await dbcon.query(`select * from users_tb where user_email=$1;`,[email]);
  if (parseInt(check_mail_status.rowCount)>0) {
    return true;
  }else{
    return false;
  }
   
}


async function signup_user(userdata){
  console.log(userdata);
  await dbcon.query('BEGIN');

  const insert_status = await dbcon.query(`INSERT INTO users_tb(user_email,username,password) values($1,$2,$3) RETURNING user_email `,[userdata.email,userdata.name,userdata.password]);
  console.log(insert_status.rows.user_email);
  await dbcon.query('COMMIT');
  
  return insert_status.rowCount;
 
  
}

module.exports = { getuseData,check_user_exists ,signup_user};
