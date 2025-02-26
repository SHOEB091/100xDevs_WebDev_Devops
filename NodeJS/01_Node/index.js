const express = require('express');
const app = express();
const port = 3000;

app.get("/route-handler",function(req,res){
    // header , body , querry parameters
    // do machine learning model
    res.json({
        name:"shoeb iqbal",
        age:21,
    })

})

app.get('/',function(req,res){
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })