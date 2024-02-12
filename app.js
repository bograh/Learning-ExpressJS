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
