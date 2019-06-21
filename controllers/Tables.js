const mainController = require('../config/mainController')

module.exports = (app) => {
    const tablesController = new mainController('Tables', app)
    app.get('/Tables', (req, resp)=>{
        tablesController.get(req, resp)
    })

    app.get('/Tables@Fields', (req, resp)=>{
        const tablesFieldsController = new mainController('TablesFields', app)
        tablesFieldsController.get(req, resp)
    })
    app.post('/Tables@Fields', (req, resp)=>{
        const tablesFieldsController = new mainController('TablesFields', app)
        tablesFieldsController.post(req, resp)
    })
    app.patch('/Tables@Fields/*', (req, resp)=>{
        const tablesFieldsController = new mainController('TablesFields', app)
        tablesFieldsController.patch(req, resp)
    })
    app.delete('/Tables@Fields/*', (req, resp)=>{
        const tablesFieldsController = new mainController('TablesFields', app)
        tablesFieldsController.delete(req, resp)
    })

    app.post('/Tables', (req, resp)=>{
        tablesController.post(req, resp)
    })

    app.patch('/Tables/*', (req, resp)=>{
        tablesController.patch(req, resp)
    })
    app.delete('/Tables/*', (req, resp)=>{
        tablesController.delete(req, resp)
    })
}
