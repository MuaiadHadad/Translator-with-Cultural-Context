import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
    return (
        <header className="site-header">
            <Link to="/" className="site-logo">
                <svg className="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="url(#gradient-header)" strokeWidth="2" fill="none"/>
                    <path d="M12 20 L18 14 L18 26 Z" fill="url(#gradient-header)"/>
                    <path d="M22 14 L28 20 L22 26 Z" fill="url(#gradient-header)"/>
                    <circle cx="20" cy="20" r="3" fill="url(#gradient-header)"/>
                    <defs>
                        <linearGradient id="gradient-header" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#667eea"/>
                            <stop offset="100%" stopColor="#764ba2"/>
                        </linearGradient>
                    </defs>
                </svg>
                <span className="logo-text">CultureLink</span>
            </Link>
        </header>
    );
}

