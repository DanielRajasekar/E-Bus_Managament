const mongoose = require('mongoose');

// Define the Bus schema
const busSchema = new mongoose.Schema({
    busInfo: { type: String, required: true }, // Complete bus information
    busType: { type: String, required: true }, // Type of bus (e.g., AC, Sleeper)
    contactDetails: { type: String, required: true }, // Contact details for bus service
    source: { type: String, required: true }, // Source location
    destination: { type: String, required: true }, // Destination location
    currentLocation: { type: String, required: true }, // Current location of the bus
    estimatedArrivalTime: { type: String, required: true }, // Estimated time to reach destination
});

// Export the model
module.exports = mongoose.model('Bus', busSchema);
