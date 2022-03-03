const client_mongo    = require('@config/database')
const mongo           = client_mongo()

module.exports.ProjectReportWeekModel = {
    Store : (data) => {
        try {
            const    dbo  = mongo.db("projectify")
            return   dbo.collection("projects_report_week").insertOne(data)
         }
         catch (error) {
            return null
         }
    },

    Update : (where, update) => {
        try {
            const    dbo  = mongo.db("projectify")
            return   dbo.collection("projects_report_week").updateOne(where, update);
         }
         catch (error) {
            return null
         }
    },

    GetByUser : (id_user) => {
        try {
            const  dbo  = mongo.db("projectify")
            return dbo.collection("projects_report_week").find({id_user}).toArray()
         }
         catch (error) {
            return null
         }
    },

    ValidByUser : (data) => {
        try {
            const   dbo  = mongo.db("projectify")
            return  dbo.collection("projects_report_week")
                            .findOne(data)
         }
         catch (error) {
            return null
         }
    },

}; 





