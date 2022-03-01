const express             = require('express')
const authController      = require('@controller/authController')
const projectsController  = require('@controller/projectsController')
const middlewareJwt       = require('@middlewares/middlewareAuth')


const Routes = express.Router()

Routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token")
    res.header("Access-Control-Allow-Origin", "*")
    next()
});

Routes.post('/api/auth', authController.Auth)
Routes.get('/api/projects', middlewareJwt, projectsController.Get)
Routes.post('/api/projects/report/week', middlewareJwt, projectsController.StoreReportWeek)
Routes.get('/api/projects/report/week/:id_user', middlewareJwt, projectsController.GetByUserReportWeek)
Routes.put('/api/projects/report/week/:id', middlewareJwt, projectsController.UpdateReportWeek)
module.exports = Routes;


