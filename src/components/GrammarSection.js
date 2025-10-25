import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faBookOpen,
    faComments,
    faBullseye,
    faLanguage,
    faCircleInfo,
    faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import "./GrammarSection.css";

export default function GrammarSection() {
    const { t, i18n } = useTranslation();
    const [searchWord, setSearchWord] = useState("");
    const [selectedLang, setSelectedLang] = useState("en");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const LANGUAGES = [
        { code: "en", name: t('languages.en') },
        { code: "pt", name: t('languages.pt') },
        { code: "es", name: t('languages.es') },
        { code: "fr", name: t('languages.fr') },
        { code: "de", name: t('languages.de') },
        { code: "ar", name: t('languages.ar') }
    ];

    async function handleSearch(e) {
        e.preventDefault();
        if (!searchWord.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:5000/grammar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    word: searchWord,
                    language: selectedLang,
                    ui_lang: i18n.language
                })
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                setResult({
                    error: true,
                    message: t('grammar.errorMsg')
                });
            }
        } catch (error) {
            console.error("Grammar search error:", error);
            setResult({
                error: true,
                message: t('grammar.connectionError')
            });
        }

        setLoading(false);
    }

    return (
        <div className="grammar-section">
            <div className="grammar-header">
                <h2><FontAwesomeIcon icon={faBook} /> {t('grammar.title')}</h2>
                <p className="grammar-subtitle">{t('grammar.subtitle')}</p>
            </div>

            <div className="grammar-card">
                <form onSubmit={handleSearch} className="grammar-form">
                    <div className="grammar-input-group">
                        <input
                            type="text"
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                            placeholder={t('grammar.searchPlaceholder')}
                            className="grammar-input"
                        />
                        <select
                            value={selectedLang}
                            onChange={(e) => setSelectedLang(e.target.value)}
                            className="grammar-lang-select"
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.code}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="grammar-btn"
                            disabled={loading || !searchWord.trim()}
                        >
                            {loading ? t('grammar.searching') : t('grammar.searchBtn')}
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="grammar-loading">
                        <div className="spinner"></div>
                        <p>{t('grammar.analyzing')}</p>
                    </div>
                )}

                {result && !result.error && (
                    <div className="grammar-result">
                        <div className="result-header">
                            <h3>{result.word}</h3>
                            {result.pronunciation && (
                                <span className="pronunciation">/{result.pronunciation}/</span>
                            )}
                            {result.wordType && (
                                <span className="word-badge">{result.wordType}</span>
                            )}
                        </div>

                        {result.definition && (
                            <div className="result-section">
                                <h4><FontAwesomeIcon icon={faBookOpen} /> {t('grammar.definition')}</h4>
                                <p>{result.definition}</p>
                            </div>
                        )}

                        {result.examples && result.examples.length > 0 && (
                            <div className="result-section">
                                <h4><FontAwesomeIcon icon={faComments} /> {t('grammar.examples')}</h4>
                                <ul className="examples-list">
                                    {result.examples.map((ex, idx) => (
                                        <li key={idx}>
                                            <span className="example-text">{ex.text}</span>
                                            {ex.translation && (
                                                <span className="example-translation">
                                                    → {ex.translation}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {result.usage && (
                            <div className="result-section">
                                <h4><FontAwesomeIcon icon={faBullseye} /> {t('grammar.usage')}</h4>
                                <p>{result.usage}</p>
                            </div>
                        )}

                        {result.conjugation && result.conjugation.length > 0 && (
                            <div className="result-section">
                                <h4><FontAwesomeIcon icon={faLanguage} /> {t('grammar.conjugation')}</h4>
                                <div className="conjugation-grid">
                                    {result.conjugation.map((conj, idx) => (
                                        <div key={idx} className="conjugation-item">
                                            <span className="conj-tense">{conj.tense}</span>
                                            <span className="conj-form">{conj.form}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {result.notes && result.notes.length > 0 && (
                            <div className="result-section">
                                <h4><FontAwesomeIcon icon={faCircleInfo} /> {t('grammar.notes')}</h4>
                                <ul className="notes-list">
                                    {result.notes.map((note, idx) => (
                                        <li key={idx}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {result && result.error && (
                    <div className="grammar-error">
                        <span className="error-icon"><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                        <p>{result.message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
