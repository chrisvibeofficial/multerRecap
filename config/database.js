const mongoose = require('mongoose');
const DB = process.env.MongoDB_URI

mongoose.connect(DB).then(() => {
  console.log('Connection to database has been established')
}).catch((error) => {
  console.log('Error connecting to database: ' + error.message)
})