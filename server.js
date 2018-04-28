const express = require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 3000;
//hbs seting
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
//maintenance here

//seting and using static files
app.use(express.static(__dirname + '/static'));
app.use('',(req,resp,next)=>{
    var now=new Date().toString();
    //put date time to var log
    var log='Date is:'+ now + req.url;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Cannot append file');
        }
    });
    next();
});
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('uppercase',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req,resp,next)=>{
   resp.render('home.hbs',{
       pageTitle:'This is a home page',
       WelcomeMessage:'Welcome to my page',
       title:req.url
   });
});

app.get('/web',(req,resp,next)=>{
   resp.render('web.hbs',{
       pageTitle:'This is a one web site',
       title:req.url
   }) ;
});

app.get('/about',(req,resp,next)=>{
   resp.send('<h1>About my website</h1>');
});
app.listen(port,()=>{
   console.log('App runing on port'+port);

});