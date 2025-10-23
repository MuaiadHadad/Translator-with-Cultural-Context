import React, { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ onDone }) {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setHide(true);
            // espera a animação de fade-out terminar e avisa o App:
            setTimeout(() => onDone?.(), 400);
        }, 1600); // tempo de loading
        return () => clearTimeout(t);
    }, [onDone]);

    return (
        <div className={`loader-overlay ${hide ? "fade-out" : ""}`}>
            <div className="loader-card">
                <div className="loader-glow" />
                <span className="badge">Elevate Your Workflow</span>
                <h1>Launching<span> SAAS</span></h1>
                <div className="dots">
                    <i></i><i></i><i></i>
                </div>
            </div>
        </div>
    );
}
