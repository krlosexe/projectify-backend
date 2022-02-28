const express         = require('express')
const app             = express()
const client_mongo    = require('@config/database')
const mongo           = client_mongo()


exports.Get = async function(request, response) {
    
    try {
        const dbo  = mongo.db("projectify");
        
        const result = await dbo.collection("projects").find({}).toArray()
        response.status(200).json(result)
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


exports.ReportWeek = async function(request, response) {

    try {
        const dbo  = mongo.db("projectify");

        const validUser = await ValidUser(dbo, request.body)

        if(!validUser){
            dbo.collection("projects_report_week").insertOne(request.body).then(()=>{
                response.status(200).json({"success": true, "message" : "register succesful"})
            });
        }else{
            response.status(400).json({"success": false, "message" : "A user should not be able to report the same project-week twice."})
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


const ValidUser = (dbo, {id_project, id_user, number_week}) => {
   
    return  dbo.collection("projects_report_week")
                            .findOne({id_project, id_user, number_week})

};





