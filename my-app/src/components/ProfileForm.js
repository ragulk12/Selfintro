import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfileForm.css';

const ProfileForm = () => {
  const location = useLocation();
  const existingProfile = location.state?.profile;
  const [formData, setFormData] = useState({
    name: existingProfile?.name || '',
    hobbies: existingProfile?.hobbies || '',
    education: existingProfile?.education || '',
    skills: existingProfile?.skills || '',
    personalDetails: existingProfile?.personalDetails || '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      if (existingProfile) {
        // Update existing profile
        await axios.put(`/api/profiles/${existingProfile._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new profile
        await axios.post('/api/profiles', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/profiles');
    } catch (error) {
      console.error('Failed to save profile', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Hobbies</label>
        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} required />
      </div>
      <div>
        <label>Education</label>
        <input type="text" name="education" value={formData.education} onChange={handleChange} required />
      </div>
      <div>
        <label>Skills</label>
        <input type="text" name="skills" value={formData.skills} onChange={handleChange} required />
      </div>
      <div>
        <label>Personal Details</label>
        <input type="text" name="personalDetails" value={formData.personalDetails} onChange={handleChange} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : existingProfile ? 'Update Profile' : 'Create Profile'}
      </button>
    </form>
  );
};

export default ProfileForm;
