// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const reportsRoutes = require('./routes/reports');
const guidesRoutes = require('./routes/guides');
const contactsRoutes = require('./routes/contacts');

const app = express();
app.use(cors());
app.use(express.json());

// route prefixes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/guides', guidesRoutes);
app.use('/api/contacts', contactsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Safetour backend listening on port ${PORT}`);
});
