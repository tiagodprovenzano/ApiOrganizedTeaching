const mysql = require('mysql')

createDBConnection = () => {
    return mysql.createConnection({
        host:'br910.hostgator.com.br',
        user: 'proven94_node',
        password:'12345',
        database: 'proven94_LearningNodeJS'
    })
}

module.exports = () =>{
    return createDBConnection;
}