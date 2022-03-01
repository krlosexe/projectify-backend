const client_mongo    = require('@config/database')
const mongo           = client_mongo()

module.exports.ProjectModel = {
    Get : () => {
        try {
            const dbo  = mongo.db("projectify");
            return dbo.collection("projects").find({}).toArray()
         }
         catch (error) {
            return null
         }
    }
}; 





