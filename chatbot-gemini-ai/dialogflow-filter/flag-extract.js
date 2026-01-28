// dialogflow-filter/flag-extract.js
// May need to parse JSON to js object
// flag : greeting or unrelated
const resp = {
    responseId: "d180e996-c609-47cd-8e35-2e28f5f070ac-f9e62b3e",
    queryResult: {
        queryText: "hello",
        action: "input.welcome",
        parameters: {},
        allRequiredParamsPresent: true,
        fulfillmentText: "Hello! How can I help you?",
        fulfillmentMessages: [
            {
                payload: {
                    flag: "greeting"
                }
            },
            {
                text: {
                    text: [
                        "Hello! How can I help you?"
                    ]
                }
            }
        ],
        intent: {
            name: "projects/gen-lang-client-0541102634/agent/intents/13c25470-bb3e-4e29-a1c9-81f085c280f5",
            displayName: "Default Welcome Intent"
        },
        intentDetectionConfidence: 1,
        languageCode: "en"
    }
}

const element = resp.queryResult.fulfillmentMessages.find(
    (obj) => {
        return 'payload' in obj
    }
)
console.log(element.payload.flag);