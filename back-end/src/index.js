require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes/watch-list/index')

const port = 3333;
const app = express()

mongoose.connect(process.env.MONGO_CREDENTIALS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});