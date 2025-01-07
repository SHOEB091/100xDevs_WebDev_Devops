setTimeout(function(){
    console.log("hi");
    setTimeout(function(){
        console.log("hello");

        setTimeout(function(){
            console.log("hello there");
        },5000)
    },3000)
},1000)

// Promisified version 

function setTimeoutPromisified(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}

setTimeoutPromisified(1000).then(()=>{
    console.log("h1");
    return setTimeoutPromisified(3000);
}).then(()=>{
    console.log("hello");
    return setTimeoutPromisified(5000);
}).then(()=>{
    console.log("hello there");
})