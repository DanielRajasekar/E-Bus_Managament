const express = require("express");
const router = express.Router();
const Bus = require("../models/Driver_Travels");
const verifyToken = require('../verifyToken')

// Post Soil Details
router.post('/postBusInfo',verifyToken,async(req,res)=>{
    try {
    
        const newBus = new Bus(req.body)

        const savedBus = await newBus.save()
        res.status(200).json(savedBus)

    }
    catch (err) {
        res.status(500).json(err)
    }
});

// View Bus Details
router.get('/busDetails',verifyToken, async (req, res) => {
    const bus = await Bus.find();
    res.json(bus);
});

// POST endpoint to search for bus locations
router.post('/search', async (req, res) => {
    const { source, destination } = req.body;

    // Validate input
    if (!source || !destination) {
        return res.status(400).json({ message: 'Source and destination are required.' });
    }

    try {
        // Query the database for buses matching source and destination
        const buses = await Bus.find({
            source: { $regex: new RegExp(`^${source}$`, 'i') },
            destination: { $regex: new RegExp(`^${destination}$`, 'i') },
        });

        if (!buses || buses.length === 0) {
            return res.status(404).json({ message: 'No buses found for the given source and destination.' });
        }

        // Return the list of buses with location details
        res.status(200).json({
            message: 'Buses found',
            data: buses.map(bus => ({
                busInfo: bus.busInfo,
                busType: bus.busType,
                contactDetails: bus.contactDetails,
                currentLocation: bus.currentLocation,
                estimatedArrivalTime: bus.estimatedArrivalTime,
            })),
        });
    } catch (err) {
        console.error('Error while searching for buses:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;

