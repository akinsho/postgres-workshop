const dbConnection = require('../database/db_connection.js');

data = {};

data.getData = (callback) => {
  dbConnection.query(`SELECT username, location FROM users`,
   (err,res) => {
     if (err) {
       callback(err);
     }
     callback(null, res.rows);
   });
};

data.setData = (data, callback) => {
  const dataObj = data.split('&').reduce((acc, item) => {
    const keyValue = item.split('=');
    if (keyValue[1]) {
      acc[keyValue[0]] = keyValue[1];
    }
    return acc;
  }, {});

  dbConnection.query(`INSERT INTO users (username, location) VALUES ('${dataObj.name}', '${dataObj.location}')`
  , (err, res) => {
    if (err) callback(err);
    else callback(null, res);
  })
}

module.exports = data;
