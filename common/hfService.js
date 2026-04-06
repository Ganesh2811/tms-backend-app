import axios from "axios";

export const generateTaskDescription = async (title) => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/google/flan-t5-base",
            {
                inputs: `Write a short task description for: ${title}`,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                },
            }
        );

        return response.data[0]?.generated_text || "No description generated";
    } catch (error) {
        console.log("HF AI Error:", error.message);
        return `This task is related to ${title}. Please complete it properly.`;
    }
};