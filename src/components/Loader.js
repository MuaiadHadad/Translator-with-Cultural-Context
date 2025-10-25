import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ onDone }) {
    const [hide, setHide] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animação de progresso
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 15;
            });
        }, 100);

        const t = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setHide(true);
                setTimeout(() => onDone?.(), 500);
            }, 300);
        }, 1800);

        return () => {
            clearTimeout(t);
            clearInterval(progressInterval);
        };
    }, [onDone]);

    return (
        <div className={`loader-overlay ${hide ? "fade-out" : ""}`}>
            <div className="loader-card">
                <div className="loader-glow" />

                {/* Logo animado */}
                <div className="loader-logo">
                    <svg viewBox="0 0 100 100" className="logo-svg">
                        <circle cx="50" cy="50" r="45" className="logo-circle" />
                        <path d="M30 50 L45 50 L45 35 M55 35 L55 50 L70 50" className="logo-path" />
                    </svg>
                </div>

                <span className="badge">Elevate Your Workflow</span>
                <h1>Translator<span> AI</span></h1>
                <p className="loader-subtitle">with Cultural Context</p>

                {/* Barra de progresso */}
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>

                <div className="loading-text">
                    {progress < 30 && "Initializing..."}
                    {progress >= 30 && progress < 60 && "Loading models..."}
                    {progress >= 60 && progress < 95 && "Almost ready..."}
                    {progress >= 95 && "Ready!"}
                </div>
            </div>
        </div>
    );
}
