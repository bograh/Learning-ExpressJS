const express = require('express');

const app = express();
const PORT = 3000;

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
    res.send(todos);
});


app.get('/', (req, res) => {
    res.send('Welcome to express');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
