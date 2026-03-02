console.log("Program started");

const promise = new Promise((res,rej) => {
    setTimeout(()=>{
        res("Promise resolved")
    },3000)
    setTimeout(()=>{
        rej("Promise rejected")
    },2000)
    console.log("Promise in progress")
}).then((res) => {
    console.log("Program completed:", res)
}).catch((err) => {
    console.log("Promise failure:", err)
})