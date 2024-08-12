import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleLogin = useCallback(async (e) => {
        e.preventDefault();

        const payload = { email, password, role };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', payload);

            if (response.status === 200) {
                // Store token and role in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role);
                console.log(response.data);
                // Redirect based on role
                switch (response.data.user.role) {
                    case 'principal':
                        navigate('/principal-dashboard');
                        break;
                    case 'teacher':
                        navigate('/teacher-dashboard');
                        break;
                    case 'student':
                        navigate('/student-dashboard');
                        break;
                    default:
                        navigate('/login');
                }
            } else {
                console.error('Login failed:', response.data.message);
            }
        } catch (error) {
            console.error('An error occurred:', error.response ? error.response.data : error.message);
        }
    }, [email, password, role, navigate]);

    return (
        <div className="loginpage col-5">
            <div className="login border border-success p-4 rounded">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="roleSelect">Role</label>
                        <select 
                            className="form-control form-control-sm" 
                            id="roleSelect"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">Select role</option>
                            <option value="principal">Principal</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">Login</button>
                </form>
            </div>
        </div>
    );
}
