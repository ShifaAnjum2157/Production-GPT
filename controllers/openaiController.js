import fetch from 'node-fetch';
import { Buffer } from 'buffer'; // For handling binary data


const apiKey = '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'; // Replace with your actual Hugging Face API key

// export const scifiImageController = async (req, res) => {
//     try {
//         const { description } = req.body; // Extract description from the request body
//         if (!description) {
//             return res.status(400).json({ message: "Description is required" });
//         }

//         const prompt = `Generate a sci-fi image based on the following description: ${description}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4-original', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 options: {
//                     num_images: 1, // Number of images to generate
//                     size: "512x512", // Image size (can be adjusted)
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return res.status(200).json({ image_url: data[0]?.url });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// export const scifiImageController = async (req, res) => {
//     try {
//         const { description } = req.body; // Extract description from the request body
//         if (!description) {
//             return res.status(400).json({ message: "Description is required" });
//         }

//         const prompt = `Generate a sci-fi image based on the following description: ${description}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v2-1', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 options: {
//                     num_images: 1,
//                     size: "512x512",
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return res.status(200).json({ image_url: data[0]?.url });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// export const scifiImageController = async (req, res) => {
//     try {
//         const { description } = req.body; // Extract description from the request body
//         if (!description) {
//             return res.status(400).json({ message: "Description is required" });
//         }

//         // Define the prompt based on the description
//         const prompt = description;

//         const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 options: {
//                     num_images: 1, // Number of images to generate
//                     size: "512x512", // Image size
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Assuming the API returns a URL to the generated image
//             return res.status(200).json({ image_url: data[0]?.url || 'No URL available' });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


export const scifiImageController = async (req, res) => {
    try {
        const { description } = req.body; // Extract description from the request body
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }

        const prompt = description;

        const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                options: {
                    num_images: 1, // Number of images to generate
                    size: "512x512", // Image size
                },
            }),
        });

        // Check if response is in JSON format
        if (response.headers.get('content-type')?.includes('application/json')) {
            const data = await response.json();
            if (response.ok) {
                return res.status(200).json({ image_url: data[0]?.url || 'No URL available' });
            } else {
                return res.status(response.status).json({ message: data.error || 'Error occurred' });
            }
        } else if (response.headers.get('content-type')?.includes('image/')) {
            // Handle image response
            const buffer = await response.buffer();
            const base64Image = buffer.toString('base64');
            return res.status(200).json({ image_base64: base64Image });
        } else {
            return res.status(response.status).json({ message: 'Unexpected response format' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// export const jsConverterController = async (req, res) => {
//     const { prompt } = req.body;

//     if (!prompt) {
//         return res.status(400).json({ error: 'Prompt is required' });
//     }

//     try {
//         const response = await axios.post('https://api-inference.huggingface.co/models/bigcode/starcoder',
//             {
//                 inputs: prompt,
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${apiKey}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//         const generatedCode = response.data[0].generated_text;
//         res.status(200).json({ code: generatedCode });

//     } catch (error) {
//         console.error('Error generating code:', error.message);
//         res.status(500).json({ error: 'Failed to generate code' });
//     }
// };

// export const jsConverterController = async (req, res) => {
//     try {
//         const { instructions } = req.body; // Extract instructions from the request body
//         if (!instructions) {
//             return res.status(400).json({ message: "Instructions are required" });
//         }

//         const prompt = `Convert the following instructions into JavaScript code:\nInstructions: ${instructions}\nJavaScript code:`;

//         const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 parameters: {
//                     max_length: 150, // Adjust length as needed
//                     temperature: 0.3, // Lower temperature for more focused output
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             const generatedText = data[0]?.generated_text?.trim();
//             return res.status(200).json({ code: generatedText || 'No code generated' });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };



export const jsConverterController = async (req, res) => {
    try {
        const { instructions } = req.body;
        if (!instructions) {
            return res.status(400).json({ message: "Instructions are required" });
        }

        const prompt = `Convert the following instructions into JavaScript code:\nInstructions: ${instructions}\nJavaScript code:`;

        const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 150,
                    temperature: 0.3,
                },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Generated Response:', data);

            const generatedText = data[0]?.generated_text;

            // Find the specific section related to the current instructions
            const startPattern = `Instructions: ${instructions}\nJavaScript code:`;
            const startIndex = generatedText.indexOf(startPattern);

            if (startIndex !== -1) {
                let codeSection = generatedText.substring(startIndex + startPattern.length).trim();

                // Find the end of the first complete JavaScript function
                const functionEndIndex = codeSection.search(/}\s*$/m);
                if (functionEndIndex !== -1) {
                    codeSection = codeSection.substring(0, functionEndIndex + 1).trim();
                }

                return res.status(200).json({ code: codeSection || 'No code generated' });
            }

            return res.status(200).json({ code: 'No code generated' });
        } else {
            return res.status(response.status).json({ message: data.error || 'Error occurred' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};





// export const jsConverterController = async (req, res) => {
//     try {
//         const { instructions } = req.body; // Extract instructions from the request body
//         if (!instructions) {
//             return res.status(400).json({ message: "Instructions are required" });
//         }

//         // Improved prompt to clarify the task
//         const prompt = `Convert the following instructions into JavaScript code:\nInstructions: ${instructions}\nJavaScript code:`;

//         const response = await fetch('https://api-inference.huggingface.co/models/codeparrot/codeparrot-small', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`, // Use environment variable for the API key
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 parameters: {
//                     max_length: 150, // Adjust length as needed
//                     temperature: 0.3, // Lower temperature for more focused output
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Access the generated text from the response
//             const generatedText = data[0]?.generated_text?.trim();

//             // Optional: Further clean the output if needed
//             const cleanedCode = generatedText || 'No code generated';

//             return res.status(200).json({ code: cleanedCode });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };


// export const jsConverterController = async (req, res) => {
//     try {
//         const { instructions } = req.body;
//         if (!instructions) {
//             return res.status(400).json({ message: "Instructions are required" });
//         }

//         // Refined prompt to focus on code generation
//         const prompt = `Please convert the following instruction into JavaScript code:\n${instructions}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 parameters: {
//                     max_length: 150,  // Adjust as needed
//                     temperature: 0.3, // Lower temperature for more deterministic output
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Check if generated text is appropriate and trim any excess
//             const generatedText = data[0]?.generated_text?.trim();

//             // Basic cleanup to extract JavaScript code
//             const cleanedCode = generatedText ? generatedText.split('\n').find(line => line.startsWith('function') || line.startsWith('const') || line.startsWith('let') || line.startsWith('var')) : 'No code generated';

//             return res.status(200).json({ code: cleanedCode });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };


// export const jsConverterController = async (req, res) => {
//     try {
//         const { instructions } = req.body; // Extract instructions from the request body
//         if (!instructions) {
//             return res.status(400).json({ message: "Instructions are required" });
//         }

//         const prompt = `Convert these instructions into JavaScript code:\n${instructions}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`, // Use environment variable for the API key
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 options: {
//                     max_length: 150, // Adjust length as needed
//                     temperature: 0.5, // Adjust creativity level as needed
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             // Access the first object in the data array and extract the generated_text
//             const generatedText = data[0]?.generated_text?.trim();

//             if (generatedText) {
//                 return res.status(200).json({ code: generatedText });
//             } else {
//                 return res.status(500).json({ message: 'No generated text found in the response', data });
//             }
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error', error: error.message });
//     }
// };

// JavaScript Converter Controller with Retry Logic


export const chatbotController = async (req, res) => {
    try {
        const { message } = req.body; // Extract the message from the request body
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: message,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ reply: data[0]?.generated_text });
        } else {
            return res.status(response.status).json({ message: data.error || 'Error occurred' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



// export const generateParagraphController = async (req, res) => {
//     try {
//         const { words } = req.body;
//         if (!words || words.length === 0) {
//             return res.status(400).json({ message: "Words are required" });
//         }

//         const prompt = `Create a detailed paragraph using the following words: ${words.join(', ')}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 parameters: {
//                     max_length: 150,
//                     temperature: 0.7,
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return res.status(200).json({ paragraph: data[0]?.generated_text || 'No text generated' });
//         } else {
//             console.error('API Error:', data);
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Server Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

export const generateParagraphController = async (req, res) => {
    try {
        const { words } = req.body;

        if (!Array.isArray(words)) {
            return res.status(400).json({ message: "Words must be an array" });
        }

        if (words.length === 0) {
            return res.status(400).json({ message: "Words are required" });
        }

        const prompt = `Write a descriptive paragraph that creatively combines these elements: ${words.join(', ')}. The paragraph should be vivid, imaginative, and seamlessly incorporate all the elements.`;

        const response = await fetch('https://api-inference.huggingface.co/models/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 150,
                    temperature: 0.7,
                },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            const generatedText = data[0]?.generated_text || '';
            console.log(data)
            // Filter out parts that are repeating the prompt or instructions
            const cleanText = generatedText.replace(/(Write a descriptive paragraph.*?\.|The paragraph should be.*?\.)/gi, '').trim();
            const paragraphs = cleanText.split('\n').filter(para => para.length > 30);
            const finalParagraph = paragraphs.length > 0 ? paragraphs[0] : 'No suitable text generated';

            return res.status(200).json({ paragraph: finalParagraph });
        } else {
            console.error('API Error:', data);
            return res.status(response.status).json({ message: data.error || 'Error occurred' });
        }
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};




// export const generateParagraphController = async (req, res) => {
//     try {
//         const { words } = req.body; // Extract the words from the request body
//         if (!words) {
//             return res.status(400).json({ message: "Words are required" });
//         }

//         const prompt = `Write a detailed paragraph using the following words: ${words.join(', ')}`;

//         const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 inputs: prompt,
//                 options: {
//                     max_length: 150, // Adjust the length of the generated paragraph
//                     temperature: 0.7, // Adjust temperature for more creativity
//                 },
//             }),
//         });

//         const data = await response.json();

//         if (response.ok) {
//             return res.status(200).json({ paragraph: data[0]?.generated_text });
//         } else {
//             return res.status(response.status).json({ message: data.error || 'Error occurred' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
// Text Summarizer Controller
export const summarizeTextController = async (req, res) => {
    try {
        const { text } = req.body; // Extract the text from the request body
        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: text,
            }),
        });

        const data = await response.json();



        if (response.ok) {
            const summary = data[0]?.summary_text || "No summary available";
            return res.status(200).json({ summary });
        } else {
            return res.status(response.status).json({ message: data.error || 'Error occurred' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



export const generateTextController = async (req, res) => {
    try {
        const { prompt } = req.body; // Extract the prompt from the request body
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inputs: prompt,
                options: {
                    max_length: 50, // You can adjust the length of the generated text
                },
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json({ message: data.error || 'Error occurred' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

