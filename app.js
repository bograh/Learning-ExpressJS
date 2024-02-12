const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

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
