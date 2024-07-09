const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
require("dotenv/config");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

const productRoutes = require("./routes/controller");
const userRoutes = require("./routes/userController");

app.use('/products', productRoutes)
app.use('/users', userRoutes)

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB bağlantısı başarılı');
    } catch (error) {
      console.error('MongoDB bağlantısı hatası:', error);
    }
  };
  
  connectDB();
  
  app.listen(PORT, () => {
    console.log(`Listening port on ${PORT}`);
  });