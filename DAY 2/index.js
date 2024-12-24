// const a = 10
// console.log(a)
//http --> Create a server
//fs --> Used to handle/interact with files
//os --> Provide information about the OS, 
//path -->

const http = require("http")
const PORT = 3000
const server = http.createServer((req,res) =>{
    res.writeHead(200,{'Content-Type':'text/plain'})
    // data = {
    //     "message":"We are learning Backend with 30 students"
    // }
    // res.end(JSON.stringify(data))
    res.end("Hello World..")
});

server.listen(PORT,()=>{
    console.log("property of JTD BACKEND")
})