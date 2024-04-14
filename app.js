const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filename = "todos.json";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.open(filename, 'w', function (err, file) {
              if (err) throw err;
              console.log('File Created!!');
            });
        } else {
            throw err;
        }
    } else {
        // data is empty ?
        if (!data.trim()) {
            todos = [];
        } else {
            try {
                todos = JSON.parse(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                todos = [];
            }
        }
    }
});

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

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
    const todo = {
        title: req.body.title,
        description: req.body.description,
        id: todos.length + 1
    };
    
    todos.push(todo);

    // Write todos to file
    fs.writeFile(filename, JSON.stringify(todos, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    res.redirect('/todos');
});

// Update todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        res.status(404).json({ message: "Todo not found" });
    } else {
        todos[todoIndex] = { ...todos[todoIndex], ...req.body };

        // Write todos to file
        fs.writeFile(filename, JSON.stringify(todos, null, 2), (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });

        res.json(todos[todoIndex]);
    }
});

app.get('/welcome', (req, res) => {
    res.send('Welcome to express');
});

app.listen(PORT, () => {
    console.log("Server started...");
});