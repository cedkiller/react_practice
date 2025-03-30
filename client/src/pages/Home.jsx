import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/Style.css';

function Home () {
    const navigate = useNavigate();
    const [task, setTask] = useState("");
    const [record, setRecord] = useState([]);

    useEffect(() => {
        getRecord();
    },[])

    const getRecord = async () => {
        try {
            const response = await axios.get('http://localhost:5000/record');
            setRecord(response.data.results);
        } catch (error) {
            Swal.fire({
                title:'Error Getting Record',
                text:'There has been error in getting record',
                icon:'error'
            })
        }
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/addTask', {task});

            if (response.data.message === "success") {
                Swal.fire({
                    title:'Task Added',
                    text:'The task has been added successfully',
                    icon:'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTask("");
                        window.location.reload();
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title:'Error Adding Task',
                text:'There has been error in adding task',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTask("");
                    window.location.reload();
                }
            })
        }
    }

    const edit = async (id) => {
        navigate(`/Edit/${id}`);
    }

    const del = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/deleteTask/${id}`);

            if (response.data.message === "success") {
                Swal.fire({
                    title:'Task Deleted',
                    text:'The task has been deleted successfully',
                    icon:'success'
                }).then((result) => {
                    if (result.isConfirmed) {
                        setTask("");
                        window.location.reload();
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title:'Error Deleting Task',
                text:'There has been error in deleting task',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    setTask("");
                    window.location.reload();
                }
            })
        }
    }

    return(
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <form onSubmit={submit}>
                    <div style={{display:'flex'}}>
                        <input type="text" placeholder='Enter a task' value={task} onChange={(e) => setTask(e.target.value)} className='form-control'/>
                        <button className='btn btn-primary' style={{marginLeft:15}}>Enter</button>
                    </div>
                </form>
            </div>
        </div>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <table className='table'>
                <tr>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Task</th>
                    <th style={{textAlign:'center', fontSize:20, height:50, backgroundColor:'black', color:'white'}}>Action</th>
                </tr>

                {record.map((rec) => (
                <tr key={rec.id}>
                    <td style={{textAlign:'center', fontSize:17, height:30}}>{rec.task}</td>
                    <td style={{textAlign:'center', fontSize:17, height:30}}><button className='btn btn-warning' onClick={() => edit(rec.id)}>Edit</button> <button className='btn btn-danger' onClick={() => del(rec.id)}>Delete</button></td>
                </tr>
                ))}
            </table>
        </div>
        </>
    );
}

export default Home;