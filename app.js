const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get single todo item by id
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
    } else {
        res.json(todo);
    }
});

// Create todo
app.post('/todos', (req, res) => {
    const todo = req.body;
    todo.id = todos.length + 1;
    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/', (req, res) => {
    res.send('Welcome to express');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
