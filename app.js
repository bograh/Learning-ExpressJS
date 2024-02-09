const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Welcome to Express App')
})

app.get('/hello', (req, res) => {
    res.send('This is the hello endpoint')
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
