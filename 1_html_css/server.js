const express = require('express');

const app = express();

app.use('/public', express.static('public'));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.get('/index',(req,res)=>{
  res.sendFile(__dirname+"/index.html")
})

app.listen(3000)
