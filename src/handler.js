const http = require('http');
const users = require('./static.js');
const fs = require('fs');
const data = require('./data.js');

const handler = (request, response) => {
  const endpoint = request.url.split('/')[1];

  if (endpoint === '') {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(__dirname + "/../public/index.html", function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });

  } else if (endpoint === "users") {
    data.getData((err,res) => {
      if (err) {
        throw err;
      }
      let dynamicData = JSON.stringify(res);
      response.writeHead(200,{
        'content-type':'application/json'
      });
      response.end(dynamicData);
    });

  } else if (endpoint === 'create-user')  {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      data.setData(body, (err, res) => {
        if (err) console.log(err);
        response.writeHead(301, {'Location':'/'});
        response.end();
      });
    });


  } else {
    const fileName = request.url;
    const fileType = request.url.split(".")[1];
    response.writeHead(200, {"Content-Type": "text/" + fileType});
    fs.readFile(__dirname + "/../public" + fileName, function(error, file) {
      if(error) {
        console.log(error);
        return;
      } else {
        response.end(file);
      }
    });
  }
};

module.exports = handler;
