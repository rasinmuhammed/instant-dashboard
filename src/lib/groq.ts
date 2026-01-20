import OpenAI from "openai"

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const client = new OpenAI({
    apiKey: GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
    dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `
You are an expert senior frontend Developer and UI/UX design Architect.
Your task is to convert raw JSON Data into a beautiful and interactive dashboard.
Output ONLY a single valid HTML File containing:
1. Tailwind CSS via CDN
2. Font Awesome or Google Fonts if needed
3. Chart.hs or similar libraries via CDN if strictly needed for visualization
4. Modern, dark-mode stylized layout corresponding to the request

IMPORTANT:
- Do NOT output markdown backticks (\`\`\`).
- RETURN ONLY THE RAW HTML STRING.
- Ensure the code is self-contained and runnable.
`

export async function generateDashboard(json: string, userPrompt: string) {
    try {
        const completion = await client.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Data: ${json}\n\nUser Request: ${userPrompt}`
                },
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
        })

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating Dashboard:", error)
        throw error
    }
}