"""
Flask Backend API for Translation with Cultural Context
Provides endpoints for translation, chat, and grammar analysis using OpenAI via GitHub Models
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend requests

# Configure GitHub Models API (free tier available)
client = OpenAI(
    base_url="https://models.github.ai/inference",
    api_key=os.environ.get("GITHUB_TOKEN")
)

# Model configuration - GPT-4o is fast and free on GitHub Models
MODEL_NAME = "openai/gpt-4o"

# Database configuration
DB_PATH = 'translations.db'

def init_db():
    """
    Initialize SQLite database with required tables
    Creates tables for translations and chat messages if they don't exist
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Translation history table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS translations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            source_lang TEXT NOT NULL,
            target_lang TEXT NOT NULL,
            source_text TEXT NOT NULL,
            translated_text TEXT,
            cultural_notes TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Chat messages table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_message TEXT NOT NULL,
            bot_response TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()

# Initialize database on startup
init_db()


@app.route('/translate', methods=['POST'])
def translate():
    """
    Translation endpoint with cultural context using GitHub Models

    Request body:
        - q: text to translate
        - source: source language code
        - target: target language code
        - ui_lang: interface language for cultural notes

    Returns:
        JSON with translated text and cultural notes
    """
    try:
        data = request.json
        text = data.get('q', '')
        source_lang = data.get('source', 'auto')
        target_lang = data.get('target', 'en')
        ui_lang = data.get('ui_lang', 'en')

        if not text.strip():
            return jsonify({'error': 'Text is required'}), 400

        # Use GitHub Models (GPT-4o) for translation with cultural context
        prompt = f"""You are a professional translator with deep cultural knowledge.

Translate the following text from {source_lang} to {target_lang}.

IMPORTANT: Provide a natural, contextually appropriate translation that considers:
- Slang and idioms
- Cultural nuances
- Formal vs informal tone
- Regional variations

Text to translate: "{text}"

Respond ONLY with the translated text, nothing else."""

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are an expert translator focused on cultural accuracy."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=500
        )

        translated_text = response.choices[0].message.content.strip()

        # Generate cultural notes in the interface language
        cultural_notes = get_cultural_notes(text, source_lang, target_lang, translated_text, ui_lang)

        # Save to database
        save_translation(source_lang, target_lang, text, translated_text, cultural_notes)

        return jsonify({
            'translatedText': translated_text,
            'culturalNotes': cultural_notes,
            'sourceLang': source_lang,
            'targetLang': target_lang
        })

    except Exception as e:
        print(f"Error in translation: {str(e)}")
        return jsonify({'error': str(e)}), 500


def get_cultural_notes(source_text, source_lang, target_lang, translated_text, ui_lang='en'):
    """
    Generate cultural notes using GitHub Models in the interface language

    Args:
        source_text: original text
        source_lang: source language code
        target_lang: target language code
        translated_text: translated result
        ui_lang: language for the notes

    Returns:
        List of cultural notes as dictionaries
    """
    # Language code to full name mapping
    lang_names = {
        'en': 'English',
        'pt': 'Portuguese',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ar': 'Arabic'
    }

    ui_lang_name = lang_names.get(ui_lang, 'English')

    try:
        prompt = f"""Analyze this translation and provide cultural context IN {ui_lang_name}:

Original ({source_lang}): "{source_text}"
Translation ({target_lang}): "{translated_text}"

IMPORTANT: Write ALL notes in {ui_lang_name} language.

Provide 2-3 brief cultural notes about:
1. Idioms, slang, or expressions that don't translate literally
2. Cultural context that helps understanding
3. Usage tips (formal/informal, regional differences)

Format as a JSON array of objects with "title" and "body" fields.
Example: [{{"title": "Cultural Note", "body": "Explanation here"}}]

Keep each note concise (max 2 sentences).
Remember: Write EVERYTHING in {ui_lang_name}!"""

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": f"You are a cultural linguistics expert. Always respond in {ui_lang_name}."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=300
        )

        import json
        notes_text = response.choices[0].message.content.strip()

        # Try to extract JSON from response
        try:
            if '[' in notes_text and ']' in notes_text:
                start = notes_text.index('[')
                end = notes_text.rindex(']') + 1
                notes = json.loads(notes_text[start:end])
                return notes
        except:
            pass

        # Fallback: return generic note
        return [{"title": "Context", "body": notes_text[:200]}]

    except Exception as e:
        print(f"Error getting cultural notes: {str(e)}")
        # Fallback messages in different languages
        fallback_messages = {
            'en': {"title": "Tip", "body": "Consider the context and tone when using this translation."},
            'pt': {"title": "Dica", "body": "Considera o contexto e o tom ao usar esta tradução."},
            'es': {"title": "Consejo", "body": "Considera el contexto y el tono al usar esta traducción."},
            'fr': {"title": "Conseil", "body": "Considérez le contexte et le ton lors de l'utilisation de cette traduction."},
            'de': {"title": "Tipp", "body": "Berücksichtigen Sie den Kontext und Ton bei der Verwendung dieser Übersetzung."},
            'ar': {"title": "نصيحة", "body": "ضع في اعتبارك السياق والنبرة عند استخدام هذه الترجمة."}
        }
        return [fallback_messages.get(ui_lang, fallback_messages['en'])]


def save_translation(source_lang, target_lang, source_text, translated_text, cultural_notes):
    """
    Save translation to database

    Args:
        source_lang: source language code
        target_lang: target language code
        source_text: original text
        translated_text: translation result
        cultural_notes: cultural context notes
    """
    try:
        import json
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO translations (source_lang, target_lang, source_text, translated_text, cultural_notes)
            VALUES (?, ?, ?, ?, ?)
        ''', (source_lang, target_lang, source_text, translated_text, json.dumps(cultural_notes)))

        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Error saving translation: {str(e)}")


@app.route('/history', methods=['GET'])
def get_history():
    """
    Get translation history

    Returns:
        JSON with list of recent translations (max 50)
    """
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute('''
            SELECT id, source_lang, target_lang, source_text, translated_text, cultural_notes, timestamp
            FROM translations
            ORDER BY timestamp DESC
            LIMIT 50
        ''')

        rows = cursor.fetchall()
        conn.close()

        import json
        history = []
        for row in rows:
            try:
                notes = json.loads(row[5]) if row[5] else []
            except:
                notes = []

            history.append({
                'id': row[0],
                'sourceLang': row[1],
                'targetLang': row[2],
                'sourceText': row[3],
                'translatedText': row[4],
                'culturalNotes': notes,
                'timestamp': row[6]
            })

        return jsonify({'history': history})

    except Exception as e:
        print(f"Error getting history: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/chat', methods=['POST'])
def chat():
    """
    Real-time chat endpoint for translation and cultural questions with advanced AI capabilities

    Request body:
        - message: user's question
        - context: optional context from previous translations
        - language: user's preferred language for responses

    Returns:
        JSON with bot response, suggestions, and timestamp
    """
    try:
        data = request.json
        user_message = data.get('message', '')
        context = data.get('context', '')
        user_lang = data.get('language', 'en')

        if not user_message.strip():
            return jsonify({'error': 'Message is required'}), 400

        # Advanced prompt engineering with personality and context awareness
        system_prompt = f"""You are Lingua, an expert multilingual AI assistant with a warm, encouraging personality. You specialize in:

🌍 CORE EXPERTISE:
- Translation assistance with cultural nuances
- Idioms, slang, and colloquial expressions
- Regional language variations and dialects
- Pronunciation tips (IPA and phonetic guidance)
- Cultural etiquette and customs
- Language learning strategies
- Grammar explanations with real-world examples

🎯 COMMUNICATION STYLE:
- Be friendly, patient, and encouraging
- Use emojis sparingly to enhance clarity
- Provide concrete examples from real conversations
- Offer practical tips that users can apply immediately
- When explaining cultural differences, be sensitive and respectful
- Keep responses concise but informative (2-4 paragraphs max)

💡 RESPONSE GUIDELINES:
1. Directly answer the user's question first
2. Add cultural context or interesting facts when relevant
3. Suggest follow-up questions or related topics
4. If the user seems to be learning, offer encouragement
5. When discussing translations, explain WHY something works that way

📝 FORMAT:
- Use bullet points for lists
- Use bold for key terms (use **term**)
- Provide examples in quotes with translations
- End with a helpful tip or question when appropriate

Remember: You're not just translating words—you're bridging cultures and helping people communicate authentically."""

        # Build conversation context
        messages = [
            {"role": "system", "content": system_prompt}
        ]

        # Add context from previous translation if available
        if context:
            messages.append({
                "role": "system",
                "content": f"Recent translation context: {context}"
            })

        messages.append({"role": "user", "content": user_message})

        # Generate response with higher temperature for more engaging conversation
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.8,  # More creative and conversational
            max_tokens=600,
            presence_penalty=0.3,  # Encourage diverse vocabulary
            frequency_penalty=0.3   # Reduce repetition
        )

        bot_response = response.choices[0].message.content.strip()

        # Generate smart suggestions based on the conversation
        suggestions = generate_smart_suggestions(user_message, bot_response)

        # Save to database
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO chat_messages (user_message, bot_response)
            VALUES (?, ?)
        ''', (user_message, bot_response))
        conn.commit()
        conn.close()

        return jsonify({
            'response': bot_response,
            'suggestions': suggestions,
            'timestamp': datetime.now().isoformat()
        })

    except Exception as e:
        print(f"Error in chat: {str(e)}")
        return jsonify({'error': str(e)}), 500


def generate_smart_suggestions(user_message, bot_response):
    """
    Generate smart follow-up suggestions based on conversation context

    Args:
        user_message: The user's question
        bot_response: The bot's response

    Returns:
        List of suggested follow-up questions
    """
    suggestions = []

    # Keyword-based smart suggestions
    user_lower = user_message.lower()

    if any(word in user_lower for word in ['translate', 'mean', 'say']):
        suggestions.extend([
            "How do I pronounce this?",
            "Are there regional variations?",
            "What's the formal version?"
        ])
    elif any(word in user_lower for word in ['slang', 'informal', 'casual']):
        suggestions.extend([
            "When should I use this?",
            "What's the origin of this expression?",
            "Are there similar expressions?"
        ])
    elif any(word in user_lower for word in ['culture', 'custom', 'etiquette']):
        suggestions.extend([
            "What else should I know?",
            "Are there common mistakes to avoid?",
            "How do locals actually use this?"
        ])
    elif any(word in user_lower for word in ['pronounce', 'pronunciation', 'sound']):
        suggestions.extend([
            "Can you break it down syllable by syllable?",
            "Are there similar sounding words?",
            "What are common pronunciation mistakes?"
        ])
    else:
        # Generic helpful suggestions
        suggestions.extend([
            "Tell me more about this",
            "Give me an example sentence",
            "What's the cultural context?"
        ])

    return suggestions[:3]  # Return top 3 suggestions


@app.route('/grammar', methods=['POST'])
def analyze_grammar():
    """
    Grammar and word usage analysis endpoint

    Request body:
        - word: word or phrase to analyze
        - language: target language

    Returns:
        JSON with grammar analysis including definition, examples, and usage tips
    """
    try:
        data = request.json
        word = data.get('word', '')
        language = data.get('language', 'en')

        if not word.strip():
            return jsonify({'error': 'Word is required'}), 400

        prompt = f"""Analyze the word/phrase "{word}" in {language}.

Provide:
1. Definition
2. Part of speech
3. 3 example sentences
4. Usage notes (formal/informal, common contexts)
5. Related words or phrases

Format as JSON with keys: definition, partOfSpeech, examples (array), usage, related"""

        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a linguistics expert providing grammar analysis."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=600
        )

        import json
        result = response.choices[0].message.content.strip()

        # Try to parse JSON response
        try:
            if '{' in result and '}' in result:
                start = result.index('{')
                end = result.rindex('}') + 1
                grammar_data = json.loads(result[start:end])
                return jsonify(grammar_data)
        except:
            pass

        # Fallback response
        return jsonify({
            'definition': result[:200],
            'partOfSpeech': 'Unknown',
            'examples': [],
            'usage': 'See definition above',
            'related': []
        })

    except Exception as e:
        print(f"Error in grammar analysis: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Health check endpoint for monitoring

    Returns:
        JSON status message
    """
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})


# Run the application
if __name__ == '__main__':
    print("🚀 Starting Flask backend on http://localhost:5000")
    print("📝 Make sure you have GITHUB_TOKEN in your .env file")
    app.run(debug=True, host='0.0.0.0', port=5000)
