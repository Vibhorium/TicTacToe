const Sequelize = require('sequelize');
const express = require('express');
const bp = require('body-parser');
const app=express();
app.use(bp.urlencoded({extended: true}))
app.use(bp.json());
const db = new Sequelize({
    host: 'localhost',
    username: 'root',
    database: 'tictactoe',
    password: 'sshrey28',
    dialect: 'mysql'
});

const user=db.define('User', {
    userid: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataTypes.STRING
    },
    username: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    wins: {
        type: Sequelize.DataTypes.INTEGER
    },
    losses: {
        type: Sequelize.DataTypes.INTEGER
    },
    draws: {
        type: Sequelize.DataTypes.INTEGER
    }
});
function check(usernamecheck,passwordcheck) {
    let x=user.find({where:{username:usernamecheck,password:passwordcheck}});
    return x;
}
function signup(name1,username1,password1) {
    return user.create({
        name:name1,
        username:username1,
        password:password1,
        wins: 0,
        losses: 0,
        draws: 0
    });
}
function getall(){
    return user.findAll({
        order:[
            ['wins','DESC']
        ]
    });
}
function getbyusername(name1) {
    return user.find({where:{username:name1}});
}
function updatedraw(name1) {
    let x=user.find({where:{username:name1}});
    getbyusername(name1).then(function(data){
    console.log('x:'+data);
    //const d=parseInt(x.draws);
    //console.log('D:'+d);
    user.update(
        {
            draws:parseInt(data.draws)+1
        },
        {where:{username:name1}}
    );
    })
    return user.find({where:{username:name1}});
}
function updateloss(name1) {
    let x=user.find({where:{username:name1}});
    getbyusername(name1).then(function(data){
        console.log('x:'+data);
        //const d=parseInt(x.draws);
        //console.log('D:'+d);
        user.update(
            {
                losses:parseInt(data.losses)+1
            },
            {where:{username:name1}}
        );
    })
    return user.find({where:{username:name1}});
}
function updatewin(name1) {
    let x=user.find({where:{username:name1}});
    getbyusername(name1).then(function(data){
        console.log('x:'+data);
        //const d=parseInt(x.draws);
        //console.log('D:'+d);
        user.update(
            {
                wins:parseInt(data.wins)+1
            },
            {where:{username:name1}}
        );
    })
    return user.find({where:{username:name1}});
}
db.sync({alter: true}).then(function () {
    console.log("Database is ready");
});

module.exports={
    check,signup,getall,updatedraw,updateloss,updatewin
};