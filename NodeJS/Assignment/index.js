const express = require('express');
const fs = require('fs');
const app = express();
const port =3000;

const FILE_PATH = 'todo.json';

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//first store the data in the todos array
let todos =  []

//Generate a unique ID for each todo
function generateId(){
    return todos.length > 0 ? todos[todos.length-1].id+1 :1;
}


app.post('/',function(req,res){
    // create a random id for the todo
    // Extract the todo title from the body 
    const {title} = req.body;
    if(!title){
        return res.status(400).json({error: 'Title is required'});
    }

    const newTodo = {
        title, 
        id : generateId(),
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.delete('/:id',function(req,res){
    // extract he todo id 
    // remove the todo form here 
    const {id} = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if(todoIndex === -1){
        return res.status(404).json({error: 'Todo not found'});
    }
    todos.splice(todoIndex,1);
    res.status(204).send();

});

app.put('/:id',function(req,res){
    const { id } = req.params;
    const { title } = req.body;
  
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
  
    const todo = todos.find(todo => todo.id === parseInt(id));
  
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
  
    todo.title = title;
    res.json(todo);
})

app.get('/',function(req,res){
    res.json({
        todos
    })
})




app.listen(port ,()=>{
    console.log(`listenig on port ${port}`);
})