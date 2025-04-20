const axios = require('axios');

//POST 
async function main (){
    const response = await fetch("https://www.toptal.com/developers/postbin/1706261117587-5522551864581",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: todoText }),
    })
    const textualData = await response.text();
    console.log(textualData);
}


// post in axios 
//change request method 
//send body 
//send headers

 async function main (){
    const response = await axios.post("https://www.toptal.com/developers/postbin/1706261117587-5522551864581");
    console.log(response.data);
 }