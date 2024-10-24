import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [record, setRecord] = useState([]);
  const [name, setName] = useState("");
  const [year_level, setYear_level] = useState("");
  const [course, setCourse] = useState("");
  const [section, setSection] = useState("");
  const [edit, setEdit] = useState(null);

  // Fetch records from server
  useEffect(() => {
    fetchRecord();
  }, []);

  const fetchRecord = async () => {
    const response = await axios.get('http://localhost:5000/record');
    setRecord(response.data);
  };

  const submit = async (e) => {
    e.preventDefault(); // Fix typo here
    if (edit) {
      await axios.put(`http://localhost:5000/record/${edit}`, { name, year_level, course, section });
    } else {
      await axios.post(`http://localhost:5000/record`, { name, year_level, course, section });
    }

    setName("");
    setYear_level("");
    setCourse("");
    setSection("");
    setEdit(null);
    fetchRecord();
  };

  const update = async (rec) => {
    setName(rec.name);
    setYear_level(rec.year_level);
    setCourse(rec.course);
    setSection(rec.section);
    setEdit(rec.id);
  }

  const deleted = async (id) => {
    await axios.delete(`http://localhost:5000/record/${id}`);
    fetchRecord();
  }

  return (
    <div>
      <div className='div_center'>
        <div className='div'>
          <h1 style={{ fontSize: 17, fontWeight: 'bold', fontFamily: 'Arial', textAlign: 'center', marginBottom: 30 }}>
            Just a demo project
          </h1>

          <form onSubmit={submit}>
            <label className='label'>Name</label><br/>
            <input
              type='text'
              placeholder='Enter your name'
              className='input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br/><br/>

            <label className='label'>Year Level</label><br/>
            <select className='input' value={year_level} onChange={(e) => setYear_level(e.target.value)}>
              <option value="">Select year level</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select><br/><br/>

            <label className='label'>Course</label><br/>
            <select className='input' value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">Select course</option>
              <option value="CCS">CCS</option>
              <option value="CBAE">CBAE</option>
              <option value="COE">COE</option>
              <option value="COA">COA</option>
            </select><br/><br/>

            <label className='label'>Section</label><br/>
            <input
              type='text'
              placeholder='Enter your section'
              className='input'
              value={section}
              onChange={(e) => setSection(e.target.value)}
            /><br/><br/>

            <center><button className='btn'>{edit ? 'Update' : 'Add'}</button></center>
          </form>
        </div>
      </div><br/><br/>
      <center>
      <table className='table'>
          <tr>
            <th className='th'>Name</th>
            <th className='th'>Year Level</th>
            <th className='th'>Course</th>
            <th className='th'>Section</th>
            <th className='th'>Action</th>
          </tr>

          {record.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.name}</td>
                <td>{rec.year_level}</td>
                <td>{rec.course}</td>
                <td>{rec.section}</td>
                <td>
                  <button onClick={() => update(rec)}>Edit</button>
                  <button onClick={() => deleted(rec.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </table>
      </center>
    </div>
  );
}

export default App;
