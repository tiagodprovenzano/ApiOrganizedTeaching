class AppDAO {
    constructor(table, connection){
        this.table = table
        this.connection = connection
        this.filter = ''
    }

    query(query, values){
        return new Promise((res, rej)=>{
            this.connection.query(query, values, 
                (e,s)=>{
                    const val = this.reply(e,s)
                    if(val.length === 0){
                        res(undefined)
                    }
                    res(val)
                }    
            )
        })
    }

    filter(filter){
        if(this.filter === ''){
            
            this.filter = ` WHERE ${filter}`
        }else{

            this.filter = `${this.filter} and ${filter}`
        }
    }

    select(){
        return new Promise((res, rej)=>{
            
            this.connection.query(`SELECT * FROM ${this.table} ${this.filter};`, [], 
                (e,s)=>{
                    const val = this.reply(e,s)
                    res(val)
                }
            )
        })
        
    }

    selectById(Id){
        return new Promise((res, rej)=>{
            
            this.connection.query(`SELECT * FROM ${this.table} where id = ?;`, [Id], 
                (e,s)=>{
                    const val = this.reply(e,s)
                    res(val)
                }
            )
        })
        
    }

    insert(obj){
        return new Promise((res, rej)=>{
            this.connection.query(`
            INSERT INTO ${this.table} SET ?;`, obj, 
                (e,s)=>{
                    const val = this.reply(e,s)
                    if(val.insertId){
                        this.selectById(val.insertId).then(
                            o=>{
                                res(o)
                            }
                        )
                    }else{
                        res(val)
                    }
                }
            )
        })
        
    }

    update(obj, Id){
        return new Promise((res, rej)=>{
            this.connection.query(`
            UPDATE ${this.table} SET ? where id=?;`, [obj, Id], 
                (e,s)=>{
                    const val = this.reply(e,s)
                    // console.log(val);
                    this.selectById(Id).then(
                        o=>{
                            res(o)
                        }
                    )
                }
            )
        })
        
    }

    delete(Id){
        return new Promise((res, rej)=>{
            this.connection.query(`DELETE From ${this.table} where id = ?`,[Id],
            (e,s)=>{
                const val = this.reply(e,s)
                this.selectById(Id).then(
                    o=>{
                        res(o)
                    }
                )
            });
        })
    }

    reply(error, success){
        if(!!error){
            // console.log(error);
            
            return error.sqlMessage    
        }
        // console.log(success);
        
        return success
    }

    checkUserKey(UserKey){
        return new Promise((res, rej)=>{
            this.query('Select * from Users where UserKey = ?;', [UserKey]).then(
                o=>{
                    res(o)
                }
            )
        })
    }
}

module.exports = AppDAO