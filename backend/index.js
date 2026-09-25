const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => {
  res.send('Backend do e-commerce em execução!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});

