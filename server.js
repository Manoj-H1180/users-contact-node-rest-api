const express = require('express')
const connectDb = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const dotenv = require('dotenv').config()
const app = express()

connectDb()

const port = process.env.PORT || 4001

app.use(express.json())
app.use('/api/contacts/', require('./router/contactRouter'));
app.use('/api/users/', require('./router/userRouter'))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})