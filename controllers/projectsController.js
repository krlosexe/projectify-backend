const {ProjectModel, ProjectReportWeekModel}  = require('@models')

exports.Get = async function(request, response) {

    try {
        const result = await ProjectModel.Get()
        response.status(200).json(result)
    }
     catch (error) {
        const link = `https://stackoverflow.com/search?q=${error.message}`
        const data = {
            "stackoverflow" : link,
            "success"       : false
        }
        response.status(400).json(data)
     }

};


exports.GetByUserReportWeek = async function(request, response) {
    try {
        const result = await ProjectReportWeekModel
                             .GetByUser(request.params.id_user)

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


exports.StoreReportWeek = async function(request, response) {

    try {
        const validUser = await ValidUser(request.body)
        console.log(validUser)
        if(!validUser){
            ProjectReportWeekModel.Store(request.body).then(()=>{
                response.status(200).json(
                    {
                        "success": true, 
                        "message" : "register succesful"
                    }
                )
            })
        }else{
            response.status(400).json({
                    "success": false, 
                    "message" : "A user should not be able to report the same project-week twice."
            })
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



exports.UpdateReportWeek = async function(request, response) {

    try {
        var ObjectID  = require('mongodb').ObjectID; 
        const where   = {"_id" : new ObjectID(request.params.id) }
        const update  = { $set: request.body }

        ProjectReportWeekModel.Update(where, update).then(()=>{
            response.status(200).json(
                {
                    "success": true, 
                    "message" : "update succesful"
                }
            )
        })
       
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


const ValidUser = ({id_project, id_user, number_week}) => {
    return ProjectReportWeekModel.ValidByUser({id_project, id_user, number_week})
};