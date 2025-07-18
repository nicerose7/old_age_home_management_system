// model/User.js
const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  action: String, // e.g., "Added Resident", "Deleted Resident"
  timestamp: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activity: [ActivitySchema], 
});

module.exports = mongoose.model('User', UserSchema);

