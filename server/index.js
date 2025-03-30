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
app.get('/record', (req, res) => {
    pool.query('SELECT * FROM record', (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({
            results: results
        });
    });
});

app.post('/addTask', (req, res) => {
    const {task} = req.body;
    pool.query('INSERT INTO record(task) VALUES(?)', [task], (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        res.json({
            message:'success'
        });
    });
});

app.delete('/deleteTask/:id', (req, res) => {
    const {id} = req.params;
    pool.query('DELETE FROM record WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        res.json({
            message:'success'
        });
    });
});

app.get('/checkTask/:id', (req, res) => {
    const {id} = req.params;
    pool.query('SELECT * FROM record WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Error' });
        }
        res.json({
            task: results[0].task
        });
    });
});

app.put('/updateTask/:id', (req, res) => {
    const {id} = req.params;
    const {task} = req.body;
    pool.query('UPDATE record SET task = ? WHERE id = ?', [task, id], (error, results) => {
        if (error) {
            console.error('Error fetching records:', error);
            return res.status(500).json({ message: 'Error fetching records' });
        }
        res.json({
            message:'success'
        });
    });
});
//end

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});