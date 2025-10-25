import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark, faPaperPlane, faRobot, faUser, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./ChatWidget.css";

export default function ChatWidget() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll para última mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    // Focar no input quando abre
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    // Mensagem de boas-vindas inicial
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                setMessages([{
                    type: "bot",
                    text: t('chat.welcome'),
                    timestamp: new Date().toISOString()
                }]);
                setSuggestions([
                    t('chat.suggestSlang'),
                    t('chat.suggestCultural'),
                    t('chat.suggestPronunciation')
                ]);
            }, 500);
        }
    }, [isOpen, messages.length, t]);

    async function sendMessage(e, suggestionText = null) {
        e?.preventDefault();
        const messageText = suggestionText || input.trim();

        if (!messageText || loading) return;

        setInput("");
        setSuggestions([]);

        // Adiciona mensagem do usuário
        const userMsg = {
            type: "user",
            text: messageText,
            timestamp: new Date().toISOString()
        };
        setMessages((m) => [...m, userMsg]);
        setLoading(true);
        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: messageText,
                    language: i18n.language
                }),
            });

            if (res.ok) {
                const data = await res.json();

                // Simula digitação
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages((m) => [...m, {
                        type: "bot",
                        text: data.response,
                        timestamp: data.timestamp
                    }]);

                    // Adiciona sugestões se disponíveis
                    if (data.suggestions && data.suggestions.length > 0) {
                        setSuggestions(data.suggestions);
                    }
                }, 800);
            } else {
                setIsTyping(false);
                setMessages((m) => [...m, {
                    type: "bot",
                    text: t('chat.errorMsg'),
                    timestamp: new Date().toISOString()
                }]);
            }
        } catch (err) {
            setIsTyping(false);
            setMessages((m) => [...m, {
                type: "bot",
                text: t('chat.connectionError'),
                timestamp: new Date().toISOString()
            }]);
        }

        setLoading(false);
    }

    function handleSuggestionClick(suggestion) {
        sendMessage(null, suggestion);
    }

    function formatMessageText(text) {
        // Formata texto markdown simples
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>');
    }

    return (
        <>
            {/* Botão flutuante com badge de notificação */}
            <button
                className={`chat-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title={t('chat.title')}
                aria-label={t('chat.title')}
            >
                <FontAwesomeIcon icon={isOpen ? faXmark : faCommentDots} />
                {!isOpen && messages.length === 0 && (
                    <span className="chat-badge">
                        <FontAwesomeIcon icon={faLightbulb} />
                    </span>
                )}
            </button>

            {/* Widget de chat */}
            {isOpen && (
                <div className="chat-widget">
                    <div className="chat-header">
                        <div className="chat-header-content">
                            <FontAwesomeIcon icon={faRobot} className="bot-icon" />
                            <div>
                                <h3>Lingua AI</h3>
                                <span className="status">{t('chat.online')}</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} aria-label={t('chat.close')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.type}`}>
                                <div className="message-avatar">
                                    <FontAwesomeIcon icon={msg.type === 'user' ? faUser : faRobot} />
                                </div>
                                <div className="message-content">
                                    <div
                                        className="bubble"
                                        dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
                                    />
                                    <span className="message-time">
                                        {new Date(msg.timestamp).toLocaleTimeString(i18n.language, {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="chat-message bot">
                                <div className="message-avatar">
                                    <FontAwesomeIcon icon={faRobot} />
                                </div>
                                <div className="message-content">
                                    <div className="bubble typing">
                                        <span></span><span></span><span></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sugestões inteligentes */}
                        {suggestions.length > 0 && !loading && (
                            <div className="suggestions-container">
                                <p className="suggestions-label">
                                    <FontAwesomeIcon icon={faLightbulb} /> {t('chat.suggestions')}
                                </p>
                                <div className="suggestions">
                                    {suggestions.map((suggestion, i) => (
                                        <button
                                            key={i}
                                            className="suggestion-chip"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-input" onSubmit={sendMessage}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('chat.placeholder')}
                            disabled={loading}
                            maxLength={500}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            aria-label={t('chat.send')}
                            className={input.trim() ? 'active' : ''}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
