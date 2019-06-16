module.exports = (context, value, resp) =>{
    const reply = {
        "context": 'https://localhost:3000' + context,
        "value": value,
    }
    resp.header("Access-Control-Allow-Origin", "*")
    resp.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    resp.json(reply)
}