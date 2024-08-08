const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.use(bodyParser.json());

app.post('/api/generate-content', async (req, res) => {
  const { name, hobbies, education, skills, personalDetails } = req.body;

  if (!name || !hobbies || !education || !skills || !personalDetails) {
    return res.status(400).json({ error: 'Name, hobbies, education, skills, and personal details are required' });
  }
  
  const prompt = `
    Write a self-introduction for a person named ${name} with the following details:
    
    Hobbies: ${hobbies}
    Education: ${education}
    Skills: ${skills}
    Personal Details: ${personalDetails} 
    with 200 words
  `;
  
  console.log(prompt); // This line is for debugging; you can remove it in production
  

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    res.json({ content: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
