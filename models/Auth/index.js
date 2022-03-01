const client_mongo    = require('@config/database')
const mongo           = client_mongo()

module.exports.AuthModel = {
    Auth : (email, password) => {
        try {
            const dbo    = mongo.db("projectify");
            const where  = {email, password}
            return dbo.collection("users").findOne(where)
         }
         catch (error) {
            return null
         }
    }
}; 





