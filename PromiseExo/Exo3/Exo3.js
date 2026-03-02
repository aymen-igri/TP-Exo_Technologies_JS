console.log("Program started");

const promise1 = new Promise((res) => {
    setTimeout(()=>{
        res("Promise 1 resolved")
    },3000)
    console.log("Promise 1 in progress")
}).then((res) => {
    console.log("Step 1 completed: ", res)
    const promise2 = new Promise((res) => {
        setTimeout(()=>{
            res("Promise 2 resolved")
        },3000)
        console.log("Promise 2 in progress")
    }).then((res) => {
        console.log("Step 2 completed: ", res)
    })
})