import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { URL } from '../url'; // Ensure you import the URL
import Search from '../component/Search';

const User = () => {
  const [busDetails, setBusDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${URL}/api/driver/busDetails`, {
          withCredentials: true, // Important for sending cookies
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.data) {
          setBusDetails(response.data);
        }
      } catch (err) {
        console.error('Error fetching bus data:', err);
        if (err.response?.status === 401) {
          setError('Please log in again to view bus details');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to view bus details');
        } else {
          setError('Error loading bus details. Please try again later.');
        }
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    };

    if (user) {
      fetchBus();
    } else {
      setLoading(false);
      setError("Please login to view bus details");
    }
  }, [user]); // Add user as a dependency

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  // Render bus details
  return (
    <>
  <Search/>
  <br />
    <div className="card">
            <div className="card-body">
                <h2 className="card-title text-primary">Buses Details</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Info</th>
                            <th>Type</th>
                            <th>Contact</th>
                            <th>Source</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {busDetails.map((bus) => (
                            <tr key={bus._id}>
                                <td>{bus.busInfo}</td>
                                <td>{bus.busType}</td>
                                <td>{bus.contactDetails}</td>
                                <td>{bus.source}</td>
                                <td>{bus.destination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};
export default User;