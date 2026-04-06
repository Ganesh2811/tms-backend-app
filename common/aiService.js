import OpenAI from "openai";

export const generateTaskDescription = async (title) => {
    try {
        const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that creates task descriptions.",
                },
                {
                    role: "user",
                    content: `Generate a short and clear task description for: ${title}`,
                },
            ],
            max_tokens: 60,
        });
        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("AI Error:", error);
        return "No description generated";
    }
};