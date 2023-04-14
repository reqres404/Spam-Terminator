const {detectSpam} = require('./helpers/checkSpam')
const express = require('express')
const app = express()

const port = 4000
var query = "sample query"
// allow all domains to access the API
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
app.get('/checkComment',(req,res)=>{
    query = req.query.q;
   
    var check_data= {
        comment:query,
        "spam":detectSpam(query)
    }
    console.log(check_data)
    res.status(200).json(check_data)
})

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`)
})