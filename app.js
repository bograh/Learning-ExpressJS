// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 3000;
// const fs = require('fs');
// const filename = "todos.json"
// app.use(bodyParser.json());

// let todos = [];

// // Get all todos
// app.get('/todos', (req, res) => {
//     fs.readFile(filename, (err, data) => {
//         if (err) throw err;
//         todos = JSON.parse(data);
//         console.log(todos);
//     });
//     res.json(todos);
// });

// // Get single todo item by id
// app.get('/todos/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const todo = todos.find(todo => todo.id === id);

//     if (!todo) {
//         res.status(404).json({ message: "Todo not found" });
//     } else {
//         res.json(todo);
//     }
// });

// // Create todo
// app.post('/todos', (req, res) => {
//     const todo = req.body;
//     todo.id = todos.length + 1;
//     todos.push(todo);
//     res.status(201).json(todo);
//     let data = JSON.stringify(todos);
//     fs.writeFile(filename, data, (err) => {
//         if (err) throw err;
//         console.log('Data written to file');
//     });
// });

// // Update todo
// app.put('/todos/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const todoIndex = todos.findIndex(todo => todo.id === id);

//     if (todoIndex === -1) {
//         res.status(404).json({ message: "Todo not fouund" });
//     } else {
//         todos[todoIndex] = { ...todos[todoIndex], ...req.body };
//         res.json(todos[todoIndex]);
//     }
// });

// app.get('/', (req, res) => {
//     res.send('Welcome to express');
// });

// app.listen(PORT, () => {
//     console.log("Server running...");
// });


const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const filename = "todos.json";

app.use(bodyParser.json());

let todos = [];

fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.open(filename, 'w', function (err, file) {
              if (err) throw err;
              console.log('File Created!');
            });
            // todos = [];
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

    // Write todos to file
    fs.writeFile(filename, JSON.stringify(todos, null, 2), (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    res.status(201).json(todo);
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

app.get('/', (req, res) => {
    res.send('Welcome to express');
});

app.listen(PORT, () => {
    console.log("Server running...");
});
