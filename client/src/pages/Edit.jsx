import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const { id } = useParams();
    const [task, setTask] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`http://localhost:5000/get_record/${id}`);
            setTask(response.data.task);
        };
        fetchTask();
    }, [id]);

    const updateTask = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/update_record/${id}`, { task });
        // Handle success or error
    };

    return (
        <div>
            <h1>Edit Task</h1>
            <form onSubmit={updateTask}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Edit;