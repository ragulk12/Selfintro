import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileList.css';

const ProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Redirect to login if no token found
        if (!token) {
            navigate('/login', { replace: true });
            return;
        }

        const fetchProfiles = async () => {
            try {
                const response = await axios.get('/api/profiles', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfiles(response.data);
            } catch (error) {
                console.error('Failed to fetch profiles', error);
                // Handle error (e.g., invalid token)
                navigate('/login', { replace: true });
            }
        };

        fetchProfiles();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    };

    return (
        <div className="profile-list-container">
            {/* <button className="back-button" onClick={() => navigate('/')}>Back to Home</button> */}
            <button className="back-button" onClick={handleLogout}>Logout</button>
            <h2>Profile List</h2>
            <Link to="/profiles/add" className="create-profile-btn">Add New Profile</Link>
            <ul>
                {profiles.map(profile => (
                    <li key={profile._id}>
                        <Link to={`/profiles/${profile._id}`}>{profile.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileList;
