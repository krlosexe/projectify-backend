const express         = require('express')
const app             = express()
const jwt             = require('jsonwebtoken')
const config          = require('@config/config')
const {AuthModel}     = require('@models')

app.set('key', config.key);

exports.Auth = async function(request, response) {

    try {
       
       const result = await AuthModel
                            .Auth(request.body.email, request.body.password)

        if(result){
            const token = GenerateToken()
            response.status(200).json({
                token,
                "name": result.email,
                "id_user": result._id,
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