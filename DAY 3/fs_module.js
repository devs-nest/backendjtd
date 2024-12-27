const fs = require('fs')

fs.writeFile("jtd/example2.csv","name,age,phone",(err) =>{
    if(err){
        console.log(err)
    }
    console.log("we wrote to a file today")
})

fs.readFile("jtd/example.txt","utf-8",(err, data) =>{
    console.log(data)
})

fs.appendFile("example.txt"," With 31 students",(err)=>{
    console.log('Content appended!');
})

fs.unlink("example.txt",(err)=>{
    console.log("file deleted")
})

fs.mkdir("JTD TESTING",(err)=>{
    console.log("Directory created")
})