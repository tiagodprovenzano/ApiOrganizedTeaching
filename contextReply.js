module.exports = (context, value, resp) =>{
    const reply = {
        "context": 'https://localhost:3000' + context,
        "value": value,
    }
    resp.json(reply)
}