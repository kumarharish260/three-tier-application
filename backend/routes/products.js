const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all products
router.get('/', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category_id, image_url } = req.body;
    const newProduct = await pool.query(
      'INSERT INTO products (name, description, price, category_id, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, category_id, image_url]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url } = req.body;
    await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, image_url = $5 WHERE id = $6',
      [name, description, price, category_id, image_url, id]
    );
    res.json('Product was updated!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json('Product was deleted!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
