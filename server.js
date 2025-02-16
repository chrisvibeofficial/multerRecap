require('dotenv').config();
require('./config/database')
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const userRouter = require('./routers/userRouter')

app.use(express.json());
app.use(userRouter)


app.listen(PORT, ()=> {
  console.log(`Server is listening to port: ${PORT}`)
})