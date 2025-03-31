const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//if front end and backend is not on same port then we use cors 
//if front end and backend is on same port then we use dont use cors  
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});



app.get("/sum", function(req, res) {
    console.log(req.name);
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.listen(3000);