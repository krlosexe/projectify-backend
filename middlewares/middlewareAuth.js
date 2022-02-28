const express         = require('express')
const app             = express()
const jwt             = require('jsonwebtoken')
const config          = require('@config/config')

app.set('key', config.key);


const middlewareJwt = express.Router();
middlewareJwt.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {      
        if (err) {
          return res.status(403).json({ message: 'Invalid Token'});    
        } else {
          req.decoded = decoded;    
          next();
        }
      });


      
    } else {
      res.status(403).send({ 
          mensaje: 'token not provided' 
      });
    }
});

module.exports = middlewareJwt;

