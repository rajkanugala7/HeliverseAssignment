import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

export default function TeacherDashboard() {
    const [students, setStudents] = useState([]);
    const [classroom, setClassroom] = useState(null); // Assuming classroom data

    useEffect(() => {
        async function fetchData() {
            try {
                const studentResponse = await axios.get('http://localhost:5000/api/students?classroomId=YOUR_CLASSROOM_ID');
                setStudents(studentResponse.data);
                // Optionally fetch classroom details
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Teacher Dashboard</h1>
            <h2>Students in Your Classroom</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                {/* Add edit and delete buttons */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Optionally add timetable creation */}
        </div>
    );
}
