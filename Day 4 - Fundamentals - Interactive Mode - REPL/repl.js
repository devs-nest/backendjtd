const repl = require('node:repl');
const obj = repl.start({ prompt: "$ ", replMode: repl.REPL_MODE_SLOPPY });

obj.on("exit", () =>{
    console.log("My repl say bye bye!!")
});