// test.js
const dialogflow = require('@google-cloud/dialogflow');
const dotenv = require("dotenv")
dotenv.config()

// 1. Setup credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = './dialogflow-keys.json';
const projectId = process.env.POJECT_ID; // <--- Replace this
const sessionId = '123456';

const sessionClient = new dialogflow.SessionsClient();

async function testChat() {
    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    // 2. The "Query" - what you are saying to the bot
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: "What is Shwaira", // Dialogflow's default welcome intent handles this
                languageCode: 'en-US',
            },
        },
    };

    // 3. Send the request
    try {
        const responses = await sessionClient.detectIntent(request);
        console.log('--- Response from Dialogflow ---');
        console.log(`Bot said: ${responses[0].queryResult.fulfillmentText}`);
    } catch (err) {
        console.error('ERROR:', err);
    }
}

testChat();