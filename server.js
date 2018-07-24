const express = require('express');
const bp = require('body-parser');
const db = require('./db');

const app=express();
app.use(bp.urlencoded({extended: true}))
app.use(bp.json());
app.use('/', express.static(__dirname + "/"));

app.post('/usersignup',(req,res)=>{
    console.log("Server Side:"+req.body.name);
    db.signup(req.body.name,req.body.username,req.body.pass).then( function (data) {
        console.log(req.body.name +" added!");
        res.send({success:true});
    })
})
app.post('/checkdetails',(req,res)=>{
    db.check(req.body.username1,req.body.pass1).then(function(row1){
        db.check(req.body.username2,req.body.pass2).then(function(row2){
            res.send({success:true, ro1:row1, ro2:row2});
        })
    })
});
app.post('/leader',(req,res)=>{
    db.getall().then(function (data) {
        res.send({rows:data,success:true});
    })
})
app.post('/updatedraw',(req,res)=>{
    db.updatedraw(req.body.name1).then(function(data){
        db.updatedraw(req.body.name2).then(function(data){
            res.send({success:true});
        })
    })
})
app.post('/updatewins',(req,res)=>{
    db.updateloss(req.body.lUsername).then(function (lose) {
        db.updatewin(req.body.wUsername).then(function(Windata){
            res.send({success:true,row:Windata});
        })
    })
})
app.listen(8288,function () {
    console.log('Server started at http://localhost:8288');
})

