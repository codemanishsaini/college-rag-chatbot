# College RAG Chatbot

An AI-powered RAG (Retrieval-Augmented Generation) chatbot that answers college-related questions using information stored in MongoDB and Google Gemini AI.

## Project Description

The College RAG Chatbot allows users to ask questions about college information through a simple chat interface. The application retrieves relevant information from MongoDB and sends the retrieved context to Gemini AI to generate an answer based on the available college data.

This project helps students quickly find college-related information without manually searching through multiple sources.

## Features

- AI-powered college chatbot
- MongoDB database integration
- Google Gemini AI integration
- Basic RAG retrieval system
- Relevant document selection using keyword matching
- College information search
- AI-generated answers based on retrieved information
- Loading state while AI generates responses
- Error handling
- Separate frontend and backend architecture

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API

## How It Works

1. The user enters a college-related question.
2. The frontend sends the question to the Express backend.
3. The backend searches MongoDB for relevant college information.
4. Relevant documents are selected using keyword matching.
5. The relevant information is sent to Gemini AI.
6. Gemini AI generates an answer based on the retrieved information.
7. The answer is returned to the frontend.
8. The user sees the answer in the chatbot interface.

## Project Structure

```text
college-rag-chatbot/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── models/
│   │   │   └── College.js
│   │   │
│   │   └── server.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
└── frontend/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    │
    ├── public/
    ├── package.json
    ├── package-lock.json
    └── tsconfig.json
```

## Environment Variables

Create a `.env` file inside the `backend` folder.

Add the following variables:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

### Local MongoDB Example

```env
MONGODB_URI=mongodb://127.0.0.1:27017/college_rag_chatbot
```

### Important

Do not add your real Gemini API key to this README file.

Your actual `backend/.env` file should contain your real credentials, for example:

```env
PORT=5000
MONGODB_URI=your_actual_mongodb_connection_string
GEMINI_API_KEY=your_actual_gemini_api_key
```

The `.env` file is ignored by Git and is not uploaded to GitHub.

## Installation

### Clone the Repository

```bash
git clone https://github.com/codemanishsaini/college-rag-chatbot.git
```

Move into the project folder:

```bash
cd college-rag-chatbot
```

## Backend Setup

Move to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Configure your existing `.env` file with:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Open a new terminal and move to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## API Endpoints

### Health Check

```text
GET /api/health
```

### Ask a College Question

```text
POST /api/chat
```

Example request:

```json
{
  "question": "Where is Matsya P.G. College located?"
}
```

### Get All College Information

```text
GET /api/colleges
```

### Seed College Information

```text
POST /api/seed-college
```

## Example Questions

- Where is the college located?
- Which university is the college affiliated with?
- What courses does the college offer?

## RAG Workflow

```text
User Question
      ↓
Frontend
      ↓
Express Backend
      ↓
MongoDB Retrieval
      ↓
Relevant College Information
      ↓
Gemini AI
      ↓
AI Generated Answer
      ↓
User
```

## Security

- Environment variables are stored in the `backend/.env` file.
- Real Gemini API keys are never included in the README.
- The `.env` file is ignored using `.gitignore`.
- Secret credentials are not uploaded to GitHub.
- `node_modules` folders are not uploaded to GitHub.

## Author

Manish Saini

GitHub: https://github.com/codemanishsaini