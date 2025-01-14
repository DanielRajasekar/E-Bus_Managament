import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { Logout } from '../component/Logout';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Driver = () => {
  const {user} = useContext(UserContext);
  const [loading, setLoading]= useState(true);
  const [error, setError]=useState(null);
  const [busInfo, setBusInfo]= useState("");
  const [busType, setBusType]= useState("");
  const [contactDetails, setContactDetails]= useState("");
  const [source, setSource]= useState("");
  const [destination, setDestination]= useState("");
  const [currentLocation, setCurrentLocation]= useState("");
  const [estimatedArrivalTime, setEstimatedArrivalTime]= useState("");

  useEffect(() => {
    const checkUserRole = () => {
      if (user) {
        setLoading(false);
        setError(null) // User data is available
      } else {
        setLoading(false);
        setError("Please login to view driver/travels page"); // No user data, still set loading to false
      }
    };

    checkUserRole();
  }, [user]);

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not an admin, redirect to home
  if (user && user.role !== 'driver') {
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
          Please login to view driver/travel page
        </div>
      </div>
    );
  }

  const handleBusInfo = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`${URL}/api/driver/postBusInfo`,{busInfo,busType,contactDetails,source,destination,currentLocation,estimatedArrivalTime},{withCredentials:true});
      setBusInfo("");
      setBusType("");
      setContactDetails("");
      setSource("");
      setDestination("");
      setCurrentLocation("");
      setEstimatedArrivalTime("");
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='container mt-5'>
      <h1>Create Bus Information</h1>
      <Logout/>
      <form onSubmit={handleBusInfo}>
        <div className="form-group">
        <label htmlFor="businfo">Bus Info:</label>
        <input
          id='businfo'
          value={busInfo}
          onChange={(e) => setBusInfo(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Info'
          required
        />
        </div>

        <div className="form-group mt-3">
        <label htmlFor="bustype">Bus Type:</label>
        <input
          id='bustype'
          value={busType}
          onChange={(e) => setBusType(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Type'
          required
        />
        </div>


        <div className="form-group mt-3">
        <label htmlFor="contactdetails">Bus Contact Details:</label>
        <input
          id='contactdetails'
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Contact Details'
          required
        />
        </div>

        <div className="form-group mt-3">
        <label htmlFor="source">Source:</label>
        <input
          id='source'
          value={source}
          onChange={(e) => setSource(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Source'
          required
        />
        </div>

        <div className="form-group mt-3">
        <label htmlFor="destination">Destination:</label>
        <input
          id='destination'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Destination'
          required
        />
        </div>

        <div className="form-group mt-3">
        <label htmlFor="currentLocation">Bus current Location:</label>
        <input
          id='currentlocation'
          value={currentLocation}
          onChange={(e) => setCurrentLocation(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Bus Current Location'
          required
        />
        </div>

        <div className="form-group mt-3">
        <label htmlFor="estimatedtime">Estimated Arrival Time:</label>
        <input
          id='estimatedtime'
          value={estimatedArrivalTime}
          onChange={(e) => setEstimatedArrivalTime(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter your Estimated Arrival Time'
          required
        />
        </div>
        <button type="submit" className="btn btn-primary mt-3 mb-5">Post Bus Info</button>
      </form>
    </div>
  )
}

export default Driver