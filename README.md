# Translator with Cultural Context

A modern translation application that provides not only accurate translations but also cultural context, idioms, and usage examples. Built with React and Flask, powered by AI.

## Features

- Real-time translation with cultural context
- Support for multiple languages (English, Portuguese, Spanish, French, German, Arabic)
- Grammar and word usage analysis
- AI-powered chat assistant for language questions
- Text-to-speech pronunciation
- Multilingual interface
- Translation history

## Tech Stack

**Frontend:**
- React 18
- React Router
- i18next for internationalization
- CSS3 with modern animations

**Backend:**
- Python Flask
- OpenAI GPT-4 via GitHub Models
- SQLite database
- CORS enabled

## Prerequisites

- Node.js 18 or higher
- Python 3.11 or higher
- OpenAI API key (via GitHub Models)

## Installation

### Local Development

1. Clone the repository
```bash
git clone <repository-url>
cd "Translator with Cultural Context"
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Configure environment variables
```bash
cd backend
cp .env.example .env
# Edit .env and add your API keys
```

5. Start the backend server
```bash
cd backend
python app.py
```

6. Start the frontend development server
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Docker Deployment

1. Build and run with Docker Compose
```bash
docker-compose up -d
```

2. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
.
├── backend/              # Flask backend API
│   ├── app.py           # Main application file
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Environment variables template
├── public/              # Static assets
├── src/                 # React source code
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── i18n/           # Internationalization config
│   └── styles/         # Global styles
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
└── package.json        # Node.js dependencies
```

## Available Scripts

### Frontend

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

### Backend

- `python app.py` - Start Flask server

## API Endpoints

- `POST /translate` - Translate text with cultural context
- `POST /chat` - AI chat assistant
- `POST /grammar` - Grammar and word analysis
- `GET /health` - Health check endpoint

## Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```
GITHUB_TOKEN=your_github_token_here
MODEL_NAME=gpt-4o
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

