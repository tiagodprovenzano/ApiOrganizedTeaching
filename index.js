const app = require('./config/custom-express')()
// app.set('port', (process.env.PORT || 4000));
// app.listen(app.get('port'), ()=>{
app.listen(3000, ()=>{
    console.log('Starting OrganizedTeaching API');
})
