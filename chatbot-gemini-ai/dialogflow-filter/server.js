// dialogflow-filter/server.js
import express from 'express';
import { v2 } from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { getGeminiResponse } from '../gemini/chatbot.js';

const app = express();
app.use(express.json());

// Path to your downloaded service account key
const credentialsPath = './shwaira-dialogflow-credentials.json'; // ← change if needed

const sessionClient = new v2.SessionsClient({
    keyFilename: credentialsPath,
});
const projectId = 'gen-lang-client-0541102634'; // ← from Google Cloud console 

app.post('/ask-dialogflow', async (req, res) => {
    const { message } = req.body; // e.g. { "message": "where is shwaira located?" }
    if (!message) {
        return res.status(400).json({ error: 'No message provided' });
    }

    try {
        // Intent detection - Dialogflow
        const sessionId = uuidv4(); // Unique per request (or per user)
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en',
                },
            },
        };
        const [response] = await sessionClient.detectIntent(request);
        const queryResult = response.queryResult;
        // Identify if fallback - greeting or unrelated query
        const element = queryResult.fulfillmentMessages.find(
            (obj) => {
                return 'payload' in obj
            }
        )
        if (element?.payload?.fields.flag.stringValue === "greeting" || element?.payload?.fields.flag.stringValue === "unrelated")
            return res.json({ source: "Dialogflow", message: queryResult.fulfillmentMessages[1].text.text[0] })


        const geminiResponse = await getGeminiResponse(message.trim())
        return res.json({ source: "Gemini", message: geminiResponse })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong', details: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});