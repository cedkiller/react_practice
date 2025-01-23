const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create MySQL pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practice',
});

// Get records
app.get('/record', (req, res) => {
    pool.query('SELECT * FROM list', (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json(results);
    });
});

// Add a record
app.post('/record', (req, res) => {
    const { list } = req.body;
    pool.query('INSERT INTO list (list_name) VALUES (?)', [list], (error, results) => {
        if (error) {
            console.error('Error adding record:', error);
            return res.status(500).json({ message: 'Error adding record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ message: 'Record added successfully' });
    });
});

// Edit a record
app.put('/record', (req, res) => {
    const { list, update } = req.body;
    pool.query('UPDATE list SET list_name=? WHERE id=?', [list, update], (error, results) => {
        if (error) {
            console.error('Error updating record:', error);
            return res.status(500).json({ message: 'Error updating record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ message: 'Record updated successfully' });
    });
});

// Delete a record
app.delete('/record', (req, res) => {
    const { id } = req.query; // Extract id from query parameter
    pool.query('DELETE FROM list WHERE id=?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting record:', error);
            return res.status(500).json({ message: 'Error deleting record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ message: 'Record deleted successfully' });
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
