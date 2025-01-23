const { json } = require("body-parser");
const express = require("express")
const PORT =  process.env.PORT || 3000
const fs = require('fs')
const path = require('path');
console.log(__dirname)
const filePath = path.join(__dirname,"data.json")
const Joi = require('joi');

const app = express()

app.use(express.json()) //MiddleWares

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    // repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],
    price: Joi.number()
        .integer()
        .min(50)
        .max(2000)
        .required(),
    description: Joi.string()
    .alphanum()
    .min(3)
    .max(50)
    .required()
        
})

function readData(){
    const data = fs.readFileSync(filePath,"utf-8");
    return JSON.parse(data);
}

function writeData(data){
    fs.writeFileSync(filePath,JSON.stringify(data))
}

app.get("/hello", (req,res) =>{
    res.status(201).json({"message":"hello World"})
})


app.get("/items",(req,res) =>{
    const items = readData();
    res.status(200).json(items);
})

app.post("/items",(req,res) =>{
    const newItem = req.body;
    const {error,value} = schema.validate(req.body)
    if(error){
        return res.status(400).json("message")
    }
    const items = readData();
    newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
})

app.put("/items/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const items = readData();
    const index = items.findIndex(i=> i.id === id)
    items[index] = {...items[index],...updatedItem, id}
    writeData(items)
    res.status(200).json(items[index])
})

app.delete("/items/:id",(req,res) =>{
    const id = parseInt(req.params.id);
    const items = readData();
    const index = items.findIndex(i=> i.id === id)
    const deletedItem = items.splice(index,1);
    writeData(items)
    res.status(200).json(deletedItem)
})

app.listen(PORT,()=>{
    console.log("property of JTD BACKEND")
})