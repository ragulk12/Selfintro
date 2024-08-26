import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileView.css';

const ProfileView = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/api/profiles/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/profiles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/profiles');
    } catch (error) {
      console.error('Failed to delete profile', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <button onClick={() => navigate('/profiles')} className="back-button">Back to Profile List</button>
      <h2>Profile View</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Hobbies:</strong> {profile.hobbies}</p>
      <p><strong>Education:</strong> {profile.education}</p>
      <p><strong>Skills:</strong> {profile.skills}</p>
      <p><strong>Personal Details:</strong> {profile.personalDetails}</p>
      <p><strong>Generated Content:</strong> {profile.generatedContent}</p>
      <div className="profile-buttons">
        <button onClick={() => navigate(`/profiles/edit/${profile._id}`, { state: { profile } })}>Edit</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProfileView;
