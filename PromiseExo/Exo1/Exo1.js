console.log("Program started");

const promise = new Promise((res) => {
    setTimeout(()=>{
        res("Promise resolved")
    },3000)
    console.log("promise in progress")
}).then((res) => {
    console.log("Program completed:", res)
})