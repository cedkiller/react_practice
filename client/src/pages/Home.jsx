import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
    // State variable to store the list of records fetched from the server.
    const [record, setRecord] = useState([]);
    // State variable to store the value of the input field, used for adding or updating records.
    const [list, setList] = useState("");
    // State variable to store the ID of the record being updated, if any.
    const [update, setUpdate] = useState(null);

    // useEffect hook to fetch initial record when the component mounts
    useEffect(() => {
        fetchRecord();
    }, []); // Empty dependency array ensures this runs only once after initial render.

    // Function to fetch all records from the server.
    const fetchRecord = async () => {
        const response = await axios.get('http://localhost:5000/record');
        setRecord(response.data);
    };

    // Function to handle form submission (add or update).
    const submit = async (e) => {
        e.preventDefault(); // Prevent form default submission
        if (update) {
            // If 'update' is set, perform an update operation.
            await axios.put('http://localhost:5000/record', { list, update });
        } else {
            // Otherwise, perform an add operation.
            await axios.post('http://localhost:5000/record', { list });
        }
        setList(""); // Clear the input field
        setUpdate(null); // Reset the update state
        fetchRecord(); // Refresh the list of records
    };

    // Function to delete a record from the server.
    const del = async (rec) => {
        const id = rec.id;
        await axios.delete(`http://localhost:5000/record?id=${id}`); // Pass id as query parameter
        fetchRecord(); // Refresh the list of records
    };

    // Function to set the state for editing a record.
    const edit = (rec) => {
        setList(rec.list_name);  // Fill input field with list name of the record to edit
        setUpdate(rec.id);     // Set the ID of the record to be updated
    };

    return (
        <>
            <br />
            {/* Container for the input form */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="div">
                    {/* Form for adding or updating list items */}
                    <form onSubmit={submit}>
                        <input
                            type="text"
                            placeholder="Enter a list"
                            className="input"
                            value={list}
                            onChange={(e) => setList(e.target.value)}
                            required // Input field is required to be filled before submitting
                        />
                        {/* Submit button that changes based on update state */}
                        <button className="submit">
                            {update ? "Update" : "Enter"}
                        </button>
                    </form>
                </div>
            </div>
            <br />
            {/* Container for the list of records */}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                    {/* Table to display records */}
                    <table className="table">
                        <thead>
                            {/* Table header */}
                            <tr>
                                <th style={{ height: 50, textAlign: "center", backgroundColor: "black", color: "white", fontSize: 17 }}>
                                    List
                                </th>
                                <th style={{ height: 50, textAlign: "center", backgroundColor: "black", color: "white", fontSize: 17 }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through the records and display in table rows */}
                            {record.map((rec) => (
                                <tr key={rec.id}>
                                    <td style={{ height: 30, textAlign: "center", fontSize: 15, color: "black" }}>
                                        {rec.list_name}
                                    </td>
                                    <td style={{ height: 30, textAlign: "center", fontSize: 15, color: "black" }}>
                                        {/* Edit button to start editing record */}
                                        <button className="edit" onClick={() => edit(rec)}>
                                            Edit
                                        </button>
                                        {/* Delete button to remove a record */}
                                        <button className="delete" onClick={() => del(rec)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Home;