import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const AVAILABLE_LANGUAGES = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = AVAILABLE_LANGUAGES.find(lang => lang.code === i18n.language) || AVAILABLE_LANGUAGES[0];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
        // Update HTML dir attribute for RTL languages
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <div className="language-switcher">
            <button
                className="lang-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change language"
            >
                <span className="flag">{currentLang.flag}</span>
                <span className="lang-code">{currentLang.code.toUpperCase()}</span>
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div className="lang-backdrop" onClick={() => setIsOpen(false)} />
                    <div className="lang-dropdown">
                        {AVAILABLE_LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                                onClick={() => changeLanguage(lang.code)}
                            >
                                <span className="flag">{lang.flag}</span>
                                <span className="lang-name">{lang.name}</span>
                                {i18n.language === lang.code && (
                                    <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

