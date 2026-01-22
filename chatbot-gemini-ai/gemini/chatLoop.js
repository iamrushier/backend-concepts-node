// chatLoop.js

const chatLoop = async () => {
    let flag = true
    while (flag) {
        const question = prompt("You: ")
        if (question.trim()) {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-lite",
                contents: question.trim()
            })
            console.log("GEMINI:")
            console.log(response.text)
        } else {
            console.error("Empty message not allowed")
            continue
        }
        flag = prompt("Want to continue chatting?(y?N): ").trim().toLowerCase().startsWith("y")
    }
}
chatLoop()
