import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./ChatWidget.css";

export default function ChatWidget() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendMessage(e) {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages((m) => [...m, { type: "user", text: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg }),
            });

            if (res.ok) {
                const data = await res.json();
                setMessages((m) => [...m, { type: "bot", text: data.response }]);
            } else {
                setMessages((m) => [...m, {
                    type: "bot",
                    text: t('chat.errorMsg')
                }]);
            }
        } catch (err) {
            setMessages((m) => [...m, {
                type: "bot",
                text: t('chat.connectionError')
            }]);
        }

        setLoading(false);
    }

    return (
        <>
            {/* Botão flutuante */}
            <button
                className="chat-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title={t('chat.title')}
            >
                <FontAwesomeIcon icon={faCommentDots} />
            </button>

            {/* Widget de chat */}
            {isOpen && (
                <div className="chat-widget">
                    <div className="chat-header">
                        <h3>{t('chat.title')}</h3>
                        <button onClick={() => setIsOpen(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.length === 0 && (
                            <div className="chat-welcome">
                                <p>{t('chat.welcome')}</p>
                                <p>{t('chat.askAbout')}</p>
                                <ul>
                                    <li>{t('chat.slang')}</li>
                                    <li>{t('chat.cultural')}</li>
                                    <li>{t('chat.pronunciation')}</li>
                                    <li>{t('chat.regional')}</li>
                                </ul>
                            </div>
                        )}

                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-message ${msg.type}`}>
                                <div className="bubble">{msg.text}</div>
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-message bot">
                                <div className="bubble typing">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <form className="chat-input" onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('chat.placeholder')}
                            disabled={loading}
                        />
                        <button type="submit" disabled={!input.trim() || loading}>
                            {t('chat.send')}
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
