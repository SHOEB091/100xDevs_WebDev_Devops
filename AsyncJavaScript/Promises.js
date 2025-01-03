/* 
JavaScript Promises to simplify managing multiple asynchronous operations, 
preventing callback hell and unmanageable code. They represent future values, 
associating handlers with eventual success or failure, resembling synchronous 
methods by postponing value delivery until later.
*/



//SYNTAX OF PROMISES
/*  
let promise = new Promise(function(resolve, reject){
     do something
});
*/

let promise = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        if(true){
            return resolve();
        }
        else{
            return reject() ;
        }
    })
}) 

promise.then(()=>{
    console.log('success');
})
.catch(()=>{
    console.log('failure');
})



function setTimeoutPromisified(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function callback() {
    console.log("5 seconds have passed");
}

setTimeoutPromisified(5000)
    .then(callback);