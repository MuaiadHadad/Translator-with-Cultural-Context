import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import "./Sidebar.css";

export default function Sidebar() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Botão de toggle do menu lateral */}
            <button
                className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Overlay quando o menu está aberto */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={closeSidebar}
            ></div>

            {/* Menu lateral */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <nav className="sidebar-nav">
                    <ul className="sidebar-menu">
                        <li>
                            <Link
                                to="/"
                                className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
                                onClick={closeSidebar}
                            >
                                <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>{t('nav.home')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/translate"
                                className={`sidebar-link ${location.pathname === "/translate" ? "active" : ""}`}
                                onClick={closeSidebar}
                            >
                                <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                <span>{t('nav.translate')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/grammar"
                                className={`sidebar-link ${location.pathname === "/grammar" ? "active" : ""}`}
                                onClick={closeSidebar}
                            >
                                <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span>{t('nav.grammar')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/features"
                                className={`sidebar-link ${location.pathname === "/features" ? "active" : ""}`}
                                onClick={closeSidebar}
                            >
                                <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>{t('nav.features')}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`sidebar-link ${location.pathname === "/about" ? "active" : ""}`}
                                onClick={closeSidebar}
                            >
                                <svg className="sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{t('nav.about')}</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="sidebar-footer">
                        <LanguageSwitcher />
                    </div>
                </nav>
            </aside>
        </>
    );
}
