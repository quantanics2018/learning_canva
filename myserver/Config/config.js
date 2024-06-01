// const Pool = require('pg').Pool;
// const userdb = new Pool({
//     user: 'postgres',
//     host: '127.0.0.1',
//     database: 'code_compiler',
//     password: 'quantanics123', //quantanics123
//     port: 5432,
// });
// module.exports = {userdb};
module.exports = {
    pgsql:{
        user: 'postgres',
        host: '127.0.0.1',
        database: 'quantanics_learning',
        password: 'quantanics123', //quantanics123
        port: 5432,
    },
    jwtSecret:'strategynk'
};

