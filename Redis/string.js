const client = require('./client');

async function init(){
    //await client .set("msg:6" ,"Hey from Node");
    await client.expire("msg:6",30);
    const result = await client.get("msg:6");
    console.log("Result ->" , result);
}

init();