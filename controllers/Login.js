const mainController = require('../config/mainController')

module.exports = (app) =>{
    const loginController = new mainController('Users', app)
    app.post('/login', (req, resp, next)=>{
        loginController.login(req, resp)
        // resp.end('fazendo login')
    })
}