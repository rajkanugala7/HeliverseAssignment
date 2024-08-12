import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function StudentDashboard() {
    const [students, setStudents] = useState([]);
    const [classroom, setClassroom] = useState(null); // Assuming classroom data

    useEffect(() => {
        async function fetchData() {
            try {
                const studentResponse = await axios.get('http://localhost:5000/api/students?classroomId=YOUR_CLASSROOM_ID');
                const classroomResponse = await axios.get('http://localhost:5000/api/classrooms/YOUR_CLASSROOM_ID');
                setStudents(studentResponse.data);
                setClassroom(classroomResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Student Dashboard</h1>
            <h2>Other Students in Your Classroom</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {/* Optionally add timetable view */}
        </div>
    );
}
