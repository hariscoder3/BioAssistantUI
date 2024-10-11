// server.js

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/api/generate', async (req, res) => {
    try {
        const { question } = req.body;
        const response = await openai.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant for biomedical research questions." },
                { role: "user", content: question },
            ],
        });

        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error("Error parsing OpenAI response:", error);
        res.status(500).send("Error generating response");
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));