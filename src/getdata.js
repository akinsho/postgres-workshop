const dbConnection = require('../database/db_connection.js');

const getData = (callback) => {
  dbConnection.query(`SELECT username, password FROM users`,
                     (err,res) => {
                       if (err) {
                         callback(err);
                       }
                       callback(null,res);
                     });
};

module.exports = getData;
