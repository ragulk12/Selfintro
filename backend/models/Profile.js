const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  hobbies: { type: String, required: true },
  education: { type: String, required: true },
  skills: { type: String, required: true },
  personalDetails: { type: String, required: true },
  generatedContent: { type: String }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
