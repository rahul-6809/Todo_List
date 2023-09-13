const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const TodoModel = require('./Model/Todomodel')
const path =require("path");
const app=express()
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb+srv://rkpandeyisin2015:B54DrIXCMjAsvffT@cluster1.3i5fv9s.mongodb.net/Todo_List')

app.post('/add', (req,res) =>{
    const task =req.body.task;
    TodoModel.create(
        {
            task:task
        }
    )
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})

app.get('/get', (req,res) =>{
    TodoModel.find()
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})

app.put('/update/:id', (req,res) =>{
    const {id} = req.params
    
    TodoModel.findByIdAndUpdate({
        _id:id
    },{done:true})
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})
app.delete('/delete/:id', (req,res) => {
    const {id} = req.params
    TodoModel.findByIdAndDelete({
        _id:id
    })
    .then(result=>res.json(result))
    .catch(err=> res.json(err))
})

app.use(express.static(path.join(__dirname,'../frontent/build')));

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'../frontent/build/index.html'));
})

app.listen(4000,()=>{
    console.log("Server Running....")
}
)