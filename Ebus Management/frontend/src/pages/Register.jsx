import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';

const Register = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(''); // Reset error state
        setLoading(true); // Set loading to true

        try {
            await axios.post(`${URL}/api/auth/register`, { firstname, lastname, email, password, role });
            // Reset the input fields after successful registration
            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setRole('');
            navigate("/"); // Navigate to the login page
        } catch (err) {
            // Handle error (you can also set an error state here)
            setError(err.response ? err.response.data : 'Registration failed. Please try again.');
            console.log(err);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container mt-5" style={{width:"700px"}}>
            <h1>Register</h1>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder='Enter your Firstname'
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                        id="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder='Enter your Lastname'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control"
                        placeholder='Enter Your Email id'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder='Enter your Password'
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="user">User </option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <h3 className="mt-3">
                <Link to="/">Already have an account? Login</Link>
            </h3>
        </div>
    );
};

export default Register;