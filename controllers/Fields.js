const mainController = require('../config/mainController')

module.exports = (app) => {
    const fieldsController = new mainController('Fields', app)
    app.get('/Fields', (req, resp)=>{
        fieldsController.get(req, resp)
    })

    app.get('/Fields@Types', (req, resp)=>{
        const fieldTypesController = new mainController('FieldTypes', app)
        fieldTypesController.get(req, resp)
    })

    app.get('/Fields@Entities', (req, resp)=>{
        const fieldEntityController = new mainController('Entity', app)
        fieldEntityController.get(req, resp)
    })

    app.post('/Fields', (req, resp)=>{
        fieldsController.post(req, resp)
    })

    app.patch('/Fields/*', (req, resp)=>{
        fieldsController.patch(req, resp)
    })
    app.delete('/Fields/*', (req, resp)=>{
        fieldsController.delete(req, resp)
    })
}
