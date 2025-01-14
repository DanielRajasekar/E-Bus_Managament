import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom'; 
import { URL } from '../url';
import { Logout } from '../component/Logout';
import { UserContext } from '../context/UserContext';

const Admin = () => {
  const { user } = useContext(UserContext);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const [loading, setLoading] = useState(false); // State for loading

    useEffect(() => {
      const checkUserRole = () => {
        if (user) {
          setLoading(false);
          setError(null) // User data is available
        } else {
          setLoading(false);
          setError("Please login to view admin page"); // No user data, still set loading to false
        }
      };
  
      checkUserRole();
    }, [user]);

    // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not an admin, redirect to home
  if (user && user.role !== 'admin') {
    return <Navigate to="/" />; // Use Navigate instead of Redirect
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  // Not authenticated state
  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Please login to view admin page
        </div>
      </div>
    );
  }

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
      } catch (err) {
          // Handle error (you can also set an error state here)
          setError(err.response ? err.response.data : 'Registration failed. Please try again.');
          console.log(err);
      } finally {
          setLoading(false); // Reset loading state
      }
  };

  return (
    <>
    <div className="container mt-5">
                <h1>Create Driver / Travels Credentials</h1>
                <Logout/>
                <br/>
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
                            <option value="driver">Driver/Travels</option>
                        </select>
                    </div>
    
                    <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Login'}
                    </button>
                </form>
            
            </div>
            
            </>
        );
    };

export default Admin