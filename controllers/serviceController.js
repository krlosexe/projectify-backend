const express         = require('express')
const app             = express()
const bcrypt          = require("bcrypt");
const client_mongo    = require('../config/database.js')
const jwt             = require('jsonwebtoken')
const config          = require('../config/config')
const mongo           = client_mongo()
const requesting      = require('request');
const fs              = require('fs');

app.set('key', config.key);



exports.get = function(request, response) {
   console.log("ejencuntado query")
   const dbo = mongo.db("ibarber");

   
   var   data  = []

   var mysort = { _id: 1 };

   dbo.collection("services")
    .find({"enable" : 1})
    .sort(mysort)
    .toArray(function(err, result) {
        data = result
        response.status(200).json(data)
   });
   
};


