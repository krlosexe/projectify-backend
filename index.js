require('module-alias/register')
const express         = require('express')
const app             = express()
const bodyParser      = require('body-parser');

// settings
app.set('port', process.env.PORT || 4050 )

app.listen(app.get('port'), ()=>{ 
    console.log('server on port', app.get('port'))
})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(require('@api/api.js'));
