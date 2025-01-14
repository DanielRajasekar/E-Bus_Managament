import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { Logout } from './Logout';

const Search = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(''); // State for error messages

    const handleSearch = async () => {
        // Validate input
        if (!source || !destination) {
            setError('Please enter both source and destination.');
            return;
        }

        setError(''); // Reset error state
        try {
            const response = await axios.post(`${URL}/api/driver/search`, { source, destination });
            // Assuming the response data is structured as { message: 'Buses found', data: [...] }
            if (response.data && response.data.data) {
                setResults(response.data.data);
            } else {
                setError('No buses found for the given source and destination.');
                setResults([]); // Reset results if no buses found
            }
        } catch (err) {
            console.error('Error searching buses:', err);
            setError(err.response?.data?.message || 'Error searching buses. Please try again later.');
            setResults([]); // Reset results on error
        }
    };

    return (
        <div className="card bg-secondary">
            <div className="card-body">
                <h3 className="card-title text-warning" >Search Bus Details</h3>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                <div className='d-flex justify-content-end' style={{gap:25}}>
                <input
                    type="text"
                    placeholder="Source"
                    className="form-control mb-2"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    style={{width:"300px"}}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    className="form-control mb-2"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{width:"300px"}}
                />
                
                <button className="btn btn-primary m-2" onClick={handleSearch}>Search</button>
                <Logout/>
                </div>
                <ul className="list-group" >
                    {results.length === 0 ? (
                        <li className="list-group-item">No results found.</li>
                    ) : (
                        
                        <div className='card'>
                            <div className="card-body">
                            <table className="table table-striped">
                            <thead>
                        <tr>
                            <th>Info</th>
                            <th>Contact</th>
                            <th>Current Location</th>
                            <th>Estimated Arrival</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {results.map((bus) => (
                            <tr key={bus._id}>
                                <td>{bus.busInfo}</td>
                                <td>{bus.contactDetails}</td>
                                <td>{bus.currentLocation}</td>
                                <td>{bus.estimatedArrivalTime}</td>
                            </tr>
                        ))}
                    </tbody>
                            </table>
                            </div>

                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Search;