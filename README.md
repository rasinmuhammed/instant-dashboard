# InstantDash

A React application that uses AI to generate real-time visual dashboards from raw JSON data.

- **Real-time Generation**: Convert JSON + Prompt into HTML/CSS dashboards
- **Modern UI**: Built with Tailwind CSS via CDN.
- **Dual AI Support**: Switch between Groq (Llama 3.3) and OpenAI (GPT-5-mini)
- **Preset Templates**: Quick demo data for SaaS, E-Commerce, DevOps

## How to Use

1. Paste JSON data in the left panel (or click a preset template)
2. Write a natural language prompt (e.g., "Create a modern dark dashboard")
3. Select AI provider (Groq or OpenAI)
4. Click "Generate Preview"
5. Toggle "Code" view to see the raw HTML

## How to Run

1. **Clone the repository**
```bash
git clone https://github.com/rasinmuhammed/instant-dashboard
cd instant-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Environment Variables**
Create a .env file in the root directory
```bash
VITE_GROQ_API_KEY=<add-your-groq-api-key>
VITE_OPENAI_API_KEY=<add-your-openai-api-key>
```
4. **Start the development server**
```bash
npm run dev
```

## Tech stack

- React + Vite
- Tailwind CSS
- OpenAI SDK + Groq API/ OpenAI API

## API Providers
This app supports two AI providers:
- **Groq**: Fast, free inference using Llama 3.3 70B
- **OpenAI**: GPT-5-mini for high-quality output