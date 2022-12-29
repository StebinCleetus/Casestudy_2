// Task1: initiate app and run server at 3000
const express = require("express");
const Cors = require("cors");
const Bodyparser = require("body-parser");
const Mongoose = require("mongoose");
const employeeModel = require("./model/employeeDB");

var app = new express;
app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({
    extended: false
}));
app.use(Cors());

const path = require('path');
app.use(express.static(path.join(__dirname + '/dist/FrontEnd')));

// Task2: create mongoDB connection 
Mongoose.connect("mongodb+srv://StebinTest:O5iizmnxHxSGnGhi@cluster0.ykdgzuo.mongodb.net/EmployeeDB?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', (req, res) => {
    employeeModel.find((err, data) => {
        if (err) console.log(err);
        else res.json(data);
    });
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    employeeModel.findOne({
            "_id": id
        }, data,
        (err, data) => {
            if (err) {
                res.json({
                    "status": "failed",
                    "Error": err
                })
            } else {

                res.json(data);
            }
        });
});


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
    let data = req.body;
    let employee = new employeeModel(data);
    await employee.save((err, data) => {
        if (err) res.json({
            "status": "failed",
            "Error": err
        })
        else res.json({
            "status": "sucess",
            "data": data
        })
    });
});


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body;
    employeeModel.findOneAndDelete({
        "_id": id
    }, data, (err, data) => {
        if (err) {
            res.json({
                "status": "failed",
                "Error": err
            })
        } else {
            res.json({
                "status": "sucess",
                "data": data
            })
        }
    });
});


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', (req, res) => {

    let data = req.body;
    let id = req.body._id;
    employeeModel.findOneAndUpdate({
        "_id": id
    }, data, (err, data) => {
        if (err) {
            res.json({
                "status": "failed",
                "Error": err
            })
        } else {
            res.json({
                "status": "sucess",
                "data": data
            })
        }
    });

});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000, () => {
    console.log("server is listen to 3000");
});