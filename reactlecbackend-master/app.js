const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const products = require('./routes/product');
const errorMiddleware = require('./middlewares/error');
const order = require('./routes/order');

// Allow multiple origins including your development URL
const allowedOrigins = ['https://reactlecfrontend.onrender.com', 'http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use(errorMiddleware);

module.exports = app;
