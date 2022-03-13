const express = require('express')
const app = express()
const colors = require('colors')
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5500

connectDB()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}))

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    if (process.env.NODE_ENV !== 'production') return res.status(200).send('Sup?')

    res.status(308).redirect('https://porridgejs.netlify.app');
})

app.use('/api/docs', require('./routes/docRoutes'));

app.use(errorHandler)

app.listen(PORT)
