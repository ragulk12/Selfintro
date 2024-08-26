const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const authenticate = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateContent = async ({ name, hobbies, education, skills, personalDetails }) => {
  const prompt = `
    Write a self-introduction for a person named ${name} with the following details:
    
    Hobbies: ${hobbies}
    Education: ${education}
    Skills: ${skills}
    Personal Details: ${personalDetails}
    of 200 words
  `;

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// Create a new profile and generate content
router.post('/', authenticate, async (req, res) => {
  const { name, hobbies, education, skills, personalDetails } = req.body;

  if (!name || !hobbies || !education || !skills || !personalDetails) {
    return res.status(400).json({ error: 'Name, hobbies, education, skills, and personal details are required' });
  }

  try {
    const generatedContent = await generateContent({ name, hobbies, education, skills, personalDetails });
    const profile = new Profile({
      user: req.user._id,
      name,
      hobbies,
      education,
      skills,
      personalDetails,
      generatedContent,
    });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Read all profiles
router.get('/', authenticate, async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user._id });
    if (profiles.length > 0) {
      res.json(profiles);
    } else {
      res.status(404).json({ error: 'No profiles found' });
    }
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

// Read a single profile by ID
router.get('/:id', authenticate, async (req, res) => {
  const profile = await Profile.findOne({ _id: req.params.id, user: req.user._id });
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

// Update a profile by ID
router.put('/:id', authenticate, async (req, res) => {
  const { name, hobbies, education, skills, personalDetails } = req.body;

  if (!name || !hobbies || !education || !skills || !personalDetails) {
    return res.status(400).json({ error: 'Name, hobbies, education, skills, and personal details are required' });
  }

  try {
    const generatedContent = await generateContent({ name, hobbies, education, skills, personalDetails });
    const profile = await Profile.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { name, hobbies, education, skills, personalDetails, generatedContent },
      { new: true }
    );
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

// Delete a profile by ID
router.delete('/:id', authenticate, async (req, res) => {
  const profile = await Profile.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (profile) {
    res.json({ message: 'Profile deleted' });
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

module.exports = router;
