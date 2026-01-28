// wit/ask.js
// server.js
import express from 'express';
// const fetch = require('node-fetch'); // or use built-in fetch in Node 18+

const app = express();
app.use(express.json());

const WIT_TOKEN = 'VPGACCCS6DUAMVL3ZFP2SVHAQWXUMFO3'; // ← paste here
const WIT_URL = 'https://api.wit.ai/message?v=20260123'; // version can stay recent

app.post('/ask-wit', async (req, res) => {
    const { message } = req.body; // e.g. { "message": "where is shwaira located?" }

    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        const response = await fetch(`${WIT_URL}&q=${encodeURIComponent(message)}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WIT_TOKEN}`,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        // Minimal meaningful response
        let answer = '';

        if (data.intents && data.intents.length > 0) {
            const topIntent = data.intents[0];
            const intentName = topIntent.name;
            const confidence = topIntent.confidence.toFixed(3);

            if (confidence < 0.7) {
                answer = "Sorry, I didn't quite understand. Can you rephrase?";
            } else {
                switch (intentName) {
                    case 'about_company':
                        answer = `Shwaira Solutions Private Limited is a technology company headquartered in Pune, Maharashtra, India. We position ourselves as a flexible virtual team partner for businesses — lean, focused, and agile. Our tagline is "Innovation Beyond Imagination." We follow ISO 9001, ISO 27001, and GDPR standards.`;
                        break;

                    case 'company_location':
                        answer = `Headquartered in Pune, Maharashtra, India. Global presence includes: USA, Canada, Mexico (North America), Denmark, Sweden (Europe), Singapore, India (Asia), and Australia.`;
                        break;

                    case 'company_stats':
                        answer = `We have completed 120+ projects, served 30+ clients, and have 75+ edge tech experts on the team.`;
                        break;

                    default:
                        answer = "I understood the topic but don't have specific info for that yet.";
                }
            }

            console.log(`Intent: ${intentName} (conf: ${confidence})`);
        } else {
            answer = "Sorry, I didn't catch that. Try asking about the company, location, or stats.";
        }

        res.json({ answer, witResponse: data }); // send back full wit data for debugging
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});