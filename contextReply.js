module.exports = (context, value, resp) =>{
    const reply = {
        "context": 'https://heroku-provenzano.herokuapp.com' + context,
        "value": value,
    }
    resp.json(reply)
}