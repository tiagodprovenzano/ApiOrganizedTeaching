const reply = require ('../contextReply')
const AppDAO = require('../src/DAO/AppDAO')

class mainController {
    constructor(endpoint, app){
        this.endpoint = endpoint
        this.app = app
    }

    get(req, resp){
        const connection = this.app.DAOConfig.connectionFactory()
        const DAO = new AppDAO(this.endpoint, connection)
        DAO.checkUserKey(req.headers.userkey).then(
            user=>{
                // console.log('user', user);
                if(!user){
                    reply (req.path, 'User not authenticated', resp)
                    connection.end()
                    return
                }
                // reply (req, 'User not authenticated')
                DAO.select().then(
                    o=> {
                        connection.end()
                        reply(req.path, o, resp)
                    }
                )
            }
        )

    }

    post(req, resp){
        const obj = req.body
        if(!obj || Object.keys(obj).length === 0){
             reply(req.path, "ERROR: Empty body.", resp)
             return
        }
        const connection = this.app.DAOConfig.connectionFactory()
        const DAO = new AppDAO(this.endpoint, connection)
        DAO.checkUserKey(req.headers.userkey).then(
            user=>{
                // console.log('user', user);
                if(!user){
                    reply (req.path, 'User not authenticated', resp)
                    connection.end()
                    return
                }
            
                DAO.insert(obj).then(
                    o=> {
                        connection.end()
                        reply(req.path, o, resp)
                    }
                )
        })

    }

    patch(req, resp){
        // console.log('req.path', req.path);
        let Id = this.getIdFromPath(req.path)
        if(!Id){
            reply(req.path, "Invalid Id.", resp)
        }
        const connection = this.app.DAOConfig.connectionFactory()
        const DAO = new AppDAO(this.endpoint, connection)
        DAO.checkUserKey(req.headers.userkey).then(
            user=>{
                // console.log('user', user);
                if(!user){
                    reply (req.path, 'User not authenticated', resp)
                    connection.end()
                    return
                }
            
                DAO.update(req.body, Id).then(
                    o=>{
                        connection.end()
                        reply(req.path, o, resp ) 
                        // resp.end('no patch: ' + Id)
                    }
                )
        })
    }

    delete(req, resp){
        let Id = this.getIdFromPath(req.path)
        if(!Id){
            reply(req.path, "Invalid Id.", resp)
        }
        const connection = this.app.DAOConfig.connectionFactory()
        const DAO = new AppDAO(this.endpoint, connection)
        DAO.checkUserKey(req.headers.userkey).then(
            user=>{
                // console.log('user', user);
                if(!user){
                    reply (req.path, 'User not authenticated', resp)
                    connection.end()
                    return
                }
            
                DAO.delete(Id).then(
                    o=>{
                        connection.end()
                        reply(req.path, o, resp ) 
                        // resp.end('no patch: ' + Id)
                    }
                )
        })
    }

    login(req, resp){
        const connection = this.app.DAOConfig.connectionFactory()
        const DAO = new AppDAO(this.endpoint, connection)
        const uuid = require('uuid')
        DAO.query('select * from Users where Email = ? and Password= PASSWORD(?);', [req.body.Email, req.body.Password]).then(
            o=>{
                // console.log('o', o);
                // console.log('UK', uuid());
                if(o){
                    DAO.update({UserKey:uuid()}, o[0].Id).then(
                        k=>{
                            k = k.map((user)=>{
                                let newuser = {
                                    Id: user.Id,
                                    Name:user.Name,
                                    Email:user.Email,
                                    UserKey:user.UserKey
                                }
                                return newuser
                            })
                            connection.end()
                            reply(req.path, k, resp ) 
                        }
                        )
                        
                }else{
                    connection.end()  
                    reply(req.path, 'Invalid credentials.', resp ) 
                }
            }
        )
        // resp.end("logging")
    }

    getIdFromPath(path){
        const reg = new RegExp('(\\d{1,})$')
        let match = path.match(reg)
        if(!match){
            return null
        }
        return match[0]
    }
}

module.exports = mainController