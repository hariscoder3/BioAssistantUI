const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY; //
const baseURL = "https://api.aimlapi.com/v1"; // AimlAPI base URL

const openai = new OpenAI({
    apiKey,
    baseURL,
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/generate', async (req, res) => {
    try {
        const { question } = req.body;

        const completion = await openai.chat.completions.create({
            model: "01-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant for biomedical research questions." },
                { role: "user", content: question },
            ],
            temperature: 0.7,
            max_tokens: 256,
        });

        // Verify that a valid response is received
        if (completion && completion.choices && completion.choices.length > 0) {
            const answer = completion.choices[0].message.content;
            res.json({ answer });
        } else {
            console.error("Unexpected response structure:", completion);
            res.status(500).json({ error: "Unexpected response structure" });
        }
    } catch (error) {
        console.error("Error with AimlAPI response:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Error generating response from AimlAPI" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
