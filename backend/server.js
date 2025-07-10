
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const adminRoute = require('./routes/admin');
app.use('/api/admin', adminRoute);

app.get('/', (req, res) => {
  res.send("🔧 Backend is working!");
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log("🚀 Server running on port 5000");
  });
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
