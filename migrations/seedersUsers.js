require('module-alias/register')
const client_mongo    = require('@config/database')
const mongo           = client_mongo()


userSeeders()

async function userSeeders(){
    
    console.log("Run Seeders User")
  
    const dbo   = mongo.db("projectify");
    const password = 1234576

 
    let data = [
        {
            "name"     : "Carlos Cardenas",
            "email"    : "client1@gmail.com",
            "password" : password,
        },
    ]

    dbo.collection("users").drop(function(err, ok) {
        if (ok) console.log("Collection deleted");
    });

    dbo.collection("users").insertMany(data, function(err, res) {
        console.log("1 document inserted");
    });
    console.log("Run Seeders User")
}