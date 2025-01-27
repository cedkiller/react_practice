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

//start
// Get records
app.get('/get_record', (req, res) => {
    pool.query('SELECT * FROM record', (error, results) => {
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

// Get a single record by id
app.get('/get_record/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM record WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching record:', error);
            return res.status(500).json({ message: 'Error fetching record' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(results[0]);
    });
});

// Add a record
app.post('/add_record', (req, res) => {
    const { task } = req.body;
    pool.query('INSERT INTO record (task) VALUES (?)', [task], (error, results) => {
        if (error) {
            console.error('Error adding record:', error);
            return res.status(500).json({ message: 'Error adding record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ message: 'success' });
    });
});

// Update a record
app.put('/update_record/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    pool.query('UPDATE record SET task = ? WHERE id = ?', [task, id], (error, results) => {
        if (error) {
            console.error('Error updating record:', error);
            return res.status(500).json({ message: 'Error updating record' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({ message: 'success' });
    });
});

// Delete a record
app.delete('/delete_record/:id', (req, res) => {
    const { id } = req.params; // Extract id from route parameter
    pool.query('DELETE FROM record WHERE id=?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting record:', error);
            return res.status(500).json({ message: 'Error deleting record' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'success' });
    });
});
//end

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});