const dbConnection = require('../database/db_connection.js');

data = {};

data.getData = (callback) => {
  dbConnection.query(`SELECT username, password FROM users`,
                     (err,res) => {
                       if (err) {
                         callback(err);
                       }
                       callback(null,res);
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

  console.log(dataObj);
  dbConnection.query(`INSERT INTO users (username, password) VALUES ('${dataObj.name}', '${dataObj.location}')`)
}

module.exports = data;
