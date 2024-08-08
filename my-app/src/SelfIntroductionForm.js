import React, { useState } from 'react';

const SelfIntroductionForm = () => {
  const [name, setName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [personalDetails, setPersonalDetails] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIntroduction('');

    try {
      const response = await fetch('/api/generate-content', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, hobbies, education, skills, personalDetails }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setIntroduction(data.content); // Match with backend response
    } catch (error) {
      setError('An error occurred while generating the introduction');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Self-Introduction Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="hobbies">Hobbies:</label>
          <input
            type="text"
            id="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="personalDetails">Personal Details:</label>
          <input
            type="text"
            id="personalDetails"
            value={personalDetails}
            onChange={(e) => setPersonalDetails(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Introduction</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {introduction && (
        <div>
          <h2>Generated Introduction:</h2>
          <p>{introduction}</p>
        </div>
      )}
    </div>
  );
};

export default SelfIntroductionForm;
