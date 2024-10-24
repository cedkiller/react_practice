const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const { json } = require('stream/consumers');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Create MySQL pool
const pool = mysql.createPool({
  host: 'localhost',  // Replace with your MySQL host
  user: 'root',       // Replace with your MySQL username
  password: '',       // Replace with your MySQL password
  database: 'practice', // Replace with your MySQL database name
});

// Get records
app.get('/record', (req, res) => {
  pool.query('SELECT * FROM record', (error, results) => {
    if (error) {
      console.error('Error fetching records:', error);
      return res.status(500).json({ message: 'Error fetching records' });
    }
    console.log('Records shown');
    res.json(results);
  });
});

// Add a record
app.post('/record', (req, res) => {
  const { name, year_level, course, section } = req.body;

  pool.query(
    'INSERT INTO record (name, year_level, course, section) VALUES (?, ?, ?, ?)',
    [name, year_level, course, section],
    (error, results) => {
      if (error) {
        console.error('Error adding record:', error);
        return res.status(500).json({ message: 'Error adding record' });
      }
      console.log('Record added');
      return res.json({ message: 'Record added successfully'});
    }
  );
});

app.put('/record/:id', (req, res) => {
  const { name, year_level, course, section } = req.body;
  const { id } = req.params;

  pool.query(
    'UPDATE record SET name=?, year_level=?, course=?, section=? WHERE id=?',
    [name, year_level, course, section, id],
    (error, results) => {
      if (error) {
        console.error('Error updating record:', error);
        return res.status(500).json({ message: 'Error updating record' });
      }
      console.log('Record updated');
      return res.status(200).json({ message: 'Record updated successfully' });
    }
  );
});

app.delete('/record/:id',(req, res)=>{
  const{id} = req.params;

  pool.query('DELETE FROM record WHERE id=?',[id],(error, results)=>{
    if (error) {
      console.log("error");
      return res.status(500).json({message: "error"});
    }

    else {
      console.log("success");
      return res.status(200).json({message: "success"});
    }
  });
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
