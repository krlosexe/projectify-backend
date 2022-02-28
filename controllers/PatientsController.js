const express         = require('express')
const app             = express()
const client_mongo    = require('../config/database.js')
const config          = require('../config/config')
const mongo           = client_mongo()
app.set('key', config.key);


exports.get = async function(request, response) {
    const dbo = mongo.db("medical");
    const where = {
        "doctor_id" : request.params.id_doctor
    }
    const result = dbo.collection("patients").find(where).toArray()
    await result.then((data) => {
        var ObjectID = require('mongodb').ObjectID; 
        response.status(200).json(data)
    })
    
};


exports.store = async function(request, response) {
    const dbo = mongo.db("medical");
    request.body.create_at = new Date()
    await dbo.collection("patients").insertOne(request.body, function(err, res) {
        console.log("patients Register");
    });
    console.log(request.body, "data")
    response.status(200).json({"success" : []})
};



exports.edit = async function(request, response) {
    const dbo = mongo.db("medical");

    var ObjectID = require('mongodb').ObjectID; 
    const query = {"_id" : new ObjectID(request.body._id) }

    var newvalues = { $set: {
        "names"          : request.body.names,
        "identification" : request.body.identification,
        "phone"          : request.body.phone,
        "email"          : request.body.email,
    } };

    dbo.collection("patients").updateOne(query, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });


    response.status(200).json({"success" : []})
};












