export async function generateChatResponse(messages, roleData, apiKey) {
  // Construct the prompt context
  const systemPrompt = `You are a multi-persona simulator in a corporate Slack channel at ${roleData.company.name}.
The user is an intern working as a ${roleData.title || 'employee'}.
The channel contains three senior members:
1. AI Manager: Strict, focuses on deadlines, progress, and overall delivery.
2. AI Tech Lead: Technical, guides on architecture, enforces constraints (${roleData.techConstraints.join(', ')}), but doesn't spoon-feed code.
3. AI Client: Vague, demanding, focuses on business needs.

Based on the conversation history and the latest user message, decide which ONE persona should reply.
Your response MUST start with the persona name followed by a colon. 
Example: "AI Tech Lead: I see you are stuck on the database connection..."
Keep it brief, natural, and authentic to the persona's role. DO NOT act like an assistant. Act like a real coworker/manager.`;

  const conversation = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
  const fullPrompt = `${systemPrompt}\n\nConversation so far:\n${conversation}\n\nChoose ONE persona and write the next reply:`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Response Error (status: ${response.status}): ${errorText}`);
    }
    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text.trim();
    
    // Parse out the persona
    const colonIndex = text.indexOf(':');
    if (colonIndex > 0 && colonIndex < 30) {
      return {
        sender: text.substring(0, colonIndex).trim(),
        text: text.substring(colonIndex + 1).trim()
      };
    }
    
    return { sender: 'AI Manager', text: text };
  } catch (error) {
    console.error("Gemini API Error details:", error);
    return { sender: 'System Error', text: `Could not connect to the simulation engine. Error: ${error.message}` };
  }
}

export async function evaluateSubmission(submission, roleData, apiKey) {
  const systemPrompt = `You are an AI Senior Reviewer grading an intern's project submission.
Role constraints they had to follow:
- Requirements: ${roleData.pmRequirements.join(', ')}
- Constraints: ${roleData.techConstraints.join(', ')}
- Midway Twist they had to adapt to: ${roleData.midwayTwist.message}

Intern's Submission:
- URL: ${submission.codeUrl}
- Implementation Notes / Code Snippets: ${submission.comments}

Evaluate how well they adapted and implemented the solution.
You MUST return ONLY a raw JSON object with this exact structure (no markdown tags):
{
  "score": <number 0-100>,
  "level": "<string e.g. 'Junior Developer'>",
  "strengths": ["<string>", "<string>", "<string>"],
  "weaknesses": ["<string>", "<string>", "<string>"],
  "nextChallenge": "<string>"
}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemPrompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Response Error (status: ${response.status}): ${errorText}`);
    }
    const data = await response.json();
    const rawText = data.candidates[0].content.parts[0].text;
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Gemini Evaluation Error details:", error);
    // Fallback to static data if API fails or parsing fails
    return roleData.evaluation;
  }
}
