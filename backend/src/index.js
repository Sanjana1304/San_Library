require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bookRouter = require('./routes/bookRoute');
const transacRouter = require('./routes/transacRoute');
const transacRouter2 = require('./routes/transacRoute2');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
      origin : process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials : true,
  })
)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully hehe');
})
.catch(err => {
  console.error('Ayo Error connecting to MongoDB:', err);
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Sanj from the backend !!!');
});

app.use('/api/books', bookRouter);
app.use('/api/transactions', transacRouter);
app.use('/api/transactions2', transacRouter2);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Woohoo! Server listening on port ${port}`);
});

module.exports = app;