const fs = require('fs')

console.log("1")

// const data = fs.readFileSync("example.txt","utf-8")
// console.log(data)
fs.readFile("example.txt","utf-8",(err, data) =>{
    console.log(data)
})

console.log("2")












{

}