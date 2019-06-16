const express =  require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')
// const sessionAuth = require('./sessionAuth')
module.exports = () => {
    const app = express()
        app.use(cors())
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())
        app.use(bodyParser.json())
        consign()
        .include('controllers')
        .include('DAOConfig')
        .into(app)
        // sessionAuth(app)
    return app;
}