const mainController = require('../config/mainController')

module.exports = (app) => {
    const studentController = new mainController('Students', app)
    app.get('/Students', (req, resp)=>{
        studentController.get(req, resp)
    })

    app.post('/Students', (req, resp)=>{
        studentController.post(req, resp)
    })

    app.patch('/Students/*', (req, resp)=>{
        studentController.patch(req, resp)
    })
    app.delete('/Students/*', (req, resp)=>{
        studentController.delete(req, resp)
    })
}
