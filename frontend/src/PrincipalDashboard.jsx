import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';

export default function PrincipalDashboard() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [showCreateClassroom, setShowCreateClassroom] = useState(false);
    const [showCreateStudent, setShowCreateStudent] = useState(false);
    const [showEditTeacher, setShowEditTeacher] = useState(false);
    const [showEditStudent, setShowEditStudent] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newClassroom, setNewClassroom] = useState({ name: '', teacherId: '', daysInSession: {} });
    const [newStudent, setNewStudent] = useState({ email: '', name: '', rollNo: '', cgpa: '', classroomId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `Bearer ${token}` };

                const [teacherResponse, studentResponse, classroomResponse] = await Promise.all([
                    axios.get('http://localhost:8080/teacher/allteachers', { headers }),
                    axios.get('http://localhost:8080/student/students', { headers }),
                    axios.get('http://localhost:8080/classroom/getClassrooms', { headers })
                ]);

                setTeachers(teacherResponse.data);
                setStudents(studentResponse.data);
                setClassrooms(classroomResponse.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleCreateClassroom = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            await axios.post('http://localhost:8080/classroom/create', newClassroom, { headers });
            setShowCreateClassroom(false);

            // Refresh the classrooms list
            const classroomResponse = await axios.get('http://localhost:8080/classroom/getClassrooms', { headers });
            setClassrooms(classroomResponse.data);
        } catch (error) {
            setError('Error creating classroom');
            console.error('Error creating classroom:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateStudent = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            await axios.post('http://localhost:8080/student/create', newStudent, { headers });
            setShowCreateStudent(false);

            // Refresh the students list
            const studentResponse = await axios.get('http://localhost:8080/student/students', { headers });
            setStudents(studentResponse.data);
        } catch (error) {
            setError('Error creating student');
            console.error('Error creating student:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditTeacher = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            await axios.put(`http://localhost:8080/teacher/${selectedTeacher._id}`, selectedTeacher, { headers });
            setShowEditTeacher(false);

            // Refresh the teachers list
            const teacherResponse = await axios.get('http://localhost:8080/teacher/allteachers', { headers });
            setTeachers(teacherResponse.data);
        } catch (error) {
            setError('Error updating teacher');
            console.error('Error updating teacher:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditStudent = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            console.log('Sending payload:', selectedStudent); // Log payload

            const response = await axios.put(`http://localhost:8080/student/students/${selectedStudent._id}`, selectedStudent, { headers });

            console.log('Response data:', response.data); // Log response

            setShowEditStudent(false);

            // Refresh the students list
            const studentResponse = await axios.get('http://localhost:8080/student/students', { headers });
            setStudents(studentResponse.data);
        } catch (error) {
            console.error('Error updating student:', error.response ? error.response.data : error.message);
            setError('Error updating student');
        } finally {
            setLoading(false);
        }
    };

    const handleViewTeacherDetails = (teacher) => {
        setSelectedTeacher(teacher);
        setShowEditTeacher(true); // Show the edit modal for viewing details
    };

    const handleViewStudentDetails = (student) => {
        setSelectedStudent(student);
        setShowEditStudent(true); // Show the edit modal for viewing details
    };

    const closeDetailModal = () => {
        setSelectedTeacher(null);
        setSelectedStudent(null);
    };

    const handleEditTeacherChange = (e) => {
        setSelectedTeacher({
            ...selectedTeacher,
            [e.target.name]: e.target.value
        });
    };

    const handleEditStudentChange = (e) => {
        setSelectedStudent({
            ...selectedStudent,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <h1>Principal Dashboard</h1>
            <Button onClick={() => setShowCreateClassroom(true)}>Create Classroom</Button>
            <Button onClick={() => setShowCreateStudent(true)}>Create Student</Button>

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <h2>Teachers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>
                                <Button variant="info" onClick={() => handleViewTeacherDetails(teacher)}>View Details</Button>
                                <Button variant="warning" onClick={() => { setSelectedTeacher(teacher); setShowEditTeacher(true); }}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Students</h2>
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
                                <Button variant="info" onClick={() => handleViewStudentDetails(student)}>View Details</Button>
                                <Button variant="warning" onClick={() => { setSelectedStudent(student); setShowEditStudent(true); }}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Create Classroom Modal */}
            <Modal show={showCreateClassroom} onHide={() => setShowCreateClassroom(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Classroom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formClassroomName">
                            <Form.Label>Classroom Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter classroom name"
                                value={newClassroom.name}
                                onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTeacherSelect">
                            <Form.Label>Select Teacher</Form.Label>
                            <Form.Control
                                as="select"
                                value={newClassroom.teacherId}
                                onChange={(e) => setNewClassroom({ ...newClassroom, teacherId: e.target.value })}
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map(teacher => (
                                    <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formClassroomDays">
                            <Form.Label>Days in Session</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g., Monday, Wednesday, Friday"
                                value={newClassroom.daysInSession}
                                onChange={(e) => setNewClassroom({ ...newClassroom, daysInSession: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateClassroom(false)}>Close</Button>
                    <Button variant="primary" onClick={handleCreateClassroom}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Create Student Modal */}
            <Modal show={showCreateStudent} onHide={() => setShowCreateStudent(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudentName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student name"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter student email"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentRollNo">
                            <Form.Label>Roll No</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter roll number"
                                value={newStudent.rollNo}
                                onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentCgpa">
                            <Form.Label>CGPA</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter CGPA"
                                value={newStudent.cgpa}
                                onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentClassroom">
                            <Form.Label>Select Classroom</Form.Label>
                            <Form.Control
                                as="select"
                                value={newStudent.classroomId}
                                onChange={(e) => setNewStudent({ ...newStudent, classroomId: e.target.value })}
                            >
                                <option value="">Select Classroom</option>
                                {classrooms.map(classroom => (
                                    <option key={classroom._id} value={classroom._id}>{classroom.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCreateStudent(false)}>Close</Button>
                    <Button variant="primary" onClick={handleCreateStudent}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Teacher Modal */}
            <Modal show={showEditTeacher} onHide={() => setShowEditTeacher(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTeacherName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={selectedTeacher?.name || ''}
                                onChange={handleEditTeacherChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTeacherEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={selectedTeacher?.email || ''}
                                onChange={handleEditTeacherChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditTeacher(false)}>Close</Button>
                    <Button variant="primary" onClick={handleEditTeacher}>Save</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Student Modal */}
            <Modal show={showEditStudent} onHide={() => setShowEditStudent(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formStudentName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={selectedStudent?.name || ''}
                                onChange={handleEditStudentChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={selectedStudent?.email || ''}
                                onChange={handleEditStudentChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentRollNo">
                            <Form.Label>Roll No</Form.Label>
                            <Form.Control
                                type="text"
                                name="rollNo"
                                value={selectedStudent?.rollNo || ''}
                                onChange={handleEditStudentChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentCgpa">
                            <Form.Label>CGPA</Form.Label>
                            <Form.Control
                                type="number"
                                name="cgpa"
                                value={selectedStudent?.cgpa || ''}
                                onChange={handleEditStudentChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentClassroom">
                            <Form.Label>Select Classroom</Form.Label>
                            <Form.Control
                                as="select"
                                name="classroomId"
                                value={selectedStudent?.classroomId || ''}
                                onChange={handleEditStudentChange}
                            >
                                <option value="">Select Classroom</option>
                                {classrooms.map(classroom => (
                                    <option key={classroom._id} value={classroom._id}>{classroom.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditStudent(false)}>Close</Button>
                    <Button variant="primary" onClick={handleEditStudent}>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
