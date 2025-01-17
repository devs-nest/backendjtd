// const { json } = require("body-parser");
const express = require("express")
const PORT = 3002
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'jtd',
    password: '123',
    port: 5433,
});


const app = express()

app.use(express.json())

// function readData(){
//     const data = fs.readFileSync(filePath,"utf-8");
//     return JSON.parse(data);
// }

// function writeData(data){
//     fs.writeFileSync(filePath,JSON.stringify(data))
// }

app.get("/hello", (req,res) =>{
    res.status(201).json({"message":"hello World"})
})


app.get("/items",async (req,res) =>{
    // const items = readData();
    await client.connect()
    const items = await client.query("Select * from items");
    await client.end()
    res.status(200).json(items.rows);
})

app.post("/items",async (req,res) =>{
    const newItem = req.body;
    await client.connect()
    const items = await client.query(`insert into items (name,price,description) Values ('${newItem.name}',${newItem.price},'${newItem.description}');`);
    await client.end()
    res.status(201).json(newItem);
})

app.put("/items/:id",async (req,res) =>{
    const id = parseInt(req.params.id);
    const item = req.body;
    await client.connect()
    const items = await client.query(`update items set price=${item.price} where id=${id};`);
    await client.end()
    res.status(200).json({"message":"updated"})
})

app.delete("/items/:id",async (req,res) =>{
    const id = parseInt(req.params.id);

    await client.connect()
    const deletedItem = await client.query(`delete from items where id=${id};`);
    await client.end()
    res.status(200).json(deletedItem)
})

// else if (method === 'POST' && url === '/items') {
//     let body = '';
//     req.on('data', chunk => (body += chunk));
//     req.on('end', () => {
//         const newItem = JSON.parse(body);
//         const items = readData();

//         newItem.id = items.length ? items[items.length - 1].id + 1 : 1; // Auto-increment ID
//         items.push(newItem);
//         writeData(items);

//         res.writeHead(201, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(newItem));
//     });
// }

// else if (method === 'PUT' && url.startsWith('/items/')) {
//     const id = parseInt(url.split("/")[2]);
//     let body = '';
//     req.on('data', chunk => (body += chunk));
//     req.on('end', () => {
//         const updatedItem = JSON.parse(body);
//         const items = readData();
//         const index = items.findIndex(i=> i.id === id)
//         items[index] = {...items[index],...updatedItem, id}
//         writeData(items)
//         res.writeHead(200,{ 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(items[index]));
// })

// app.put("/items/:id",(req,res) =>{
//     const id = parseInt(req.params.id);
//     const updatedItem = req.body;
//     const items = readData();
//     const index = items.findIndex(i=> i.id === id)
//     items[index] = {...items[index],...updatedItem, id}
//     writeData(items)
//     res.status(200),json(items[index])
// })

// // else if (method === 'GET' && url === '/items') {
// //     const items = readData();
// //     res.writeHead(200,{ 'Content-Type': 'application/json' });
// //     res.end(JSON.stringify(items));
// // }

// app.get("/items",(req,res) =>{
//     const items = readData();
//     res.status(200),json(items)
// })

// // else if (method === 'DELETE' && url.startsWith('/items/')) {
// //     const id = parseInt(url.split("/")[2]);

// //     const items = readData();
// //     const index = items.findIndex(i=> i.id === id)
// //     const deletedItem = items.splice(index,1);
// //     writeData(items)
// //     res.writeHead(200,{ 'Content-Type': 'application/json' });
// //     res.end(JSON.stringify(deletedItem));
// //    }
// app.delete("/items/:id",(req,res) =>{
//     const id = parseInt(req.params.id);
//     const items = readData();
//     const index = items.findIndex(i=> i.id === id)
//     const deletedItem = items.splice(index,1);
//     writeData(items)
//     res.status(200),json(deletedItem)
// })

app.listen(PORT,()=>{
    console.log("property of JTD BACKEND")
})