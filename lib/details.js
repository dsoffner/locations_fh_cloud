var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var https = require('https');
var request = require('request');

function detailsRoute() {
  var details = new express.Router();
  details.use(cors());
  details.use(bodyParser());


  // POST REST endpoint - note we use 'body-parser' middleware above to parse the request body in this route.
  // This can also be added in application.js
  // See: https://github.com/senchalabs/connect#middleware for a list of Express 4 middleware

  details.post('/', function(req, res) {
     
        var host = 'https://locations-2445581559600.apicast.io';
        var path = '/locations/details/';
        var userKey = 'b80c4314a6503e678088ed271e515dfe';

        var userId = req.body.userId;
        if(!userId){
            userId = '1';
        }

        request({url: host + path + userId + '?user_key=' + userKey}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                var parsed = JSON.parse(body);
                res.json({details: parsed.details});
            }
        })
  });

  return details;
}

module.exports = detailsRoute;
