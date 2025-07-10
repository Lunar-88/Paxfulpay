
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/', async (req, res) => {
    const { email, password, code1, code2, code3, code4 } = req.body;
  
    console.log("Incoming admin data:", req.body); // 👈 Add this
  
    try {
      const newAdmin = new Admin({
        email,
        password,
        codes: { code1, code2, code3, code4 }
      });
  
      await newAdmin.save();
      res.status(201).json({ message: "✅ Admin data saved successfully" });
    } catch (err) {
      console.error("❌ Error saving admin:", err); // 👈 Add this
      res.status(500).json({ error: "❌ Failed to save admin data", details: err.message });
    }
  });
  

module.exports = router;
