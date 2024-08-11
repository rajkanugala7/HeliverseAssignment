import React, { useCallback, useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [person, setPerson] = useState("principal");

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        console.log(person);
    }, [email, password, person]); // Ensure to include dependencies if you use them

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
                        <label htmlFor="personSelect">Role</label>
                        <select 
                            className="form-control form-control-sm " 
                            id="personSelect"
                            onChange={(e) => setPerson(e.target.value)}
                        >
                            <option value="">Select role</option>
                            <option value="Principal">Principal</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-5">Login</button>
                </form>
            </div>
        </div>
    );
}
