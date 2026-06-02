# AI Demo Internship Simulator

An AI-driven virtual internship platform that simulates real-world software engineering environments. Instead of passively watching tutorials, users learn by interacting dynamically with AI personas and completing real, contextualized coding tasks.

## Features

- **Dynamic Multi-Persona Simulation**: Powered by Gemini 2.5 Flash, the app routes messages automatically between an AI CEO, AI Product Manager, and AI Tech Lead based on conversation context.
- **Real-time Slack-like Workspace**: A fully responsive, premium glassmorphic UI representing a virtual team channel, complete with pinned project briefs and codebase submission tabs.
- **Dynamic Scenario Generation**: Unpredictable "Client Requirement Changes" (twists) happen mid-project to simulate authentic corporate chaos and adaptiveness.
- **AI Auto-Reviewer**: Project submissions are evaluated programmatically by the AI, scoring the intern on adaptability, constraints adherence, and technical execution.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone "https://github.com/yatharthsachdeva23/Ai-internship-simulator.git"
   cd "AI Demo Internship"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=AQ.your_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Visit `http://localhost:5173` in your browser.

## Technologies Used

- **Framework**: React via Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism, dynamic animations, dark mode)
- **AI Integration**: Google Generative AI REST API (`gemini-2.5-flash`)

## License

This project is licensed under the MIT License.
