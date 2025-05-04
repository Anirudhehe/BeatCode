import { GoogleGenerativeAI } from "@google/generative-ai";

export const initializeGeminiAPI=()=>{
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }
    return new GoogleGenerativeAI(apiKey);
};

export const optimizedSolution = async(userCode,language)=>{
   try{
    const genAI = initializeGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = `I have a ${language} solution that i believe is solving a DSA/ leetcode problem:
    ${userCode}
    Please:
    1. Identify what problem this code is likely trying to solve in one line.
    2. Provide an optimised solution with better time and/or space complexity.
    3. Give a concise explanation of the optimization in points  (e.g., "Use merge sort instead of bubble sort")
    4. Keep your response brief and focus on the optimization in 6  BULLET POINTS MAXIMUM .(give a big subheading "Optimized Code for you"  )
    5. Make sure that the content is well structured with no **,## and all,it's easily copyable and don't number it.
    6. Make sure the solution is handling edge cases appropriately (don't give content for this) `;

     const result = await model.generateContent(prompt);
     const response = await result.response;
     const text = response.text();
     return text;
   }
   catch(error){
    console.error("Error in optimizedSolution:", error);
    throw error;
   } 
};

export const compareSolutions = async(userCode,language,optimalSolution)=>{
  try{
    const genAI = initializeGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt =` Compare these two ${language} solutions:
    ORIGINAL SOLUTION:
    ${userCode}
    OPTIMIZED SOLUTION:
    ${optimalSolution}
    Please Provide :
    1. Time complexity of original solution in one word like O(n).
    2. Time complexity of optimized solution in one word like O(n).
    3. Space complexity of original solution in one word like O(n).
    4. Space complexity of optimized solution in one word like O(n).
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;

  } 
  catch(error){
    console.error("Error in compareSolutions:", error);
    throw error; 
  }
};

export const hints = async(userCode, language) => {
  try {
    const genAI = initializeGeminiAPI();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `I have a ${language} solution that i believe is solving a DSA/ leetcode problem:
    ${userCode}
    Please:
    1. Identify what problem this code is likely trying to solve in one line.(eg:" I see you're trying to solve __ problem").
    2. Give me 3 hints to make it more optimized based on my code.
    3. Format your response with bullet points (•)  whith no *and # for each hint .
    4. Keep each hints SHORT and CONSIZE and focused on a specific improvement.
    5.(each hint shouldn't be more than 10 words).
    6. Let the last bullet point be "Use these hints and try again!"`
    ;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch(error) {
    console.error("Error in generating hints:", error);
    throw error;
  }
};
