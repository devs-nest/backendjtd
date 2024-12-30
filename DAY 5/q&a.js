
function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function runTasks() {
    console.log("Hi I am good.")
    await delay(5000)
    console.log("Hi good I am also great.")
}

runTasks();