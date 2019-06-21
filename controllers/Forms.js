const mainController = require('../config/mainController')

module.exports = (app) => {
    const formControler = new mainController('Forms', app)
    app.get('/Forms', (req, resp)=>{
        formControler.get(req, resp)
    })

    app.post('/Forms', (req, resp)=>{
        formControler.post(req, resp)
    })
    app.patch('/Forms/*', (req, resp)=>{
        formControler.patch(req, resp)
    })
    app.delete('/Forms/*', (req, resp)=>{
        formControler.delete(req, resp)
    })
}
