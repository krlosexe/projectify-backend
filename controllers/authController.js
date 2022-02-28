const express         = require('express')
const app             = express()
const client_mongo    = require('@config/database')
const jwt             = require('jsonwebtoken')
const config          = require('@config/config')
const mongo           = client_mongo()

app.set('key', config.key);


exports.Auth = async function(request, response) {

    try {
        const dbo   = mongo.db("projectify");

        const where = {
            "email"   : request.body.email,
            "password" : request.body.password
        }

        const result = await dbo.collection("users").findOne(where)
        if(result){
            const token = GenerateToken()
            response.status(200).json({
                token,
                "success" : true
            })
        }else{
            response.status(400).json("Email o Password Incorrecto")
        }
     }
     catch (error) {
         const link = `https://stackoverflow.com/search?q=${error.message}`
        const data = {
            "stackoverflow" :  link,
            "success"       : false
        }
        response.status(400).json(data)
     }

};



const GenerateToken = () =>{
    const payload = {
        check:  true
    };
    return jwt.sign(payload, app.get('key'), {
        expiresIn: '365d' 
    });
}