import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./HomePage.css";

export default function HomePage() {
    const { t } = useTranslation();
    const rootRef = useRef(null);

    useEffect(() => {
        const el = rootRef.current;
        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
            const my = (e.clientY - (r.top + r.height / 2)) / r.height;
            el.style.setProperty("--mx", mx.toFixed(3));
            el.style.setProperty("--my", my.toFixed(3));
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    return (
        <>
            <div ref={rootRef} className="hero">
                <div className="hero-rays" />
                <div className="particles" aria-hidden="true">
                    {Array.from({ length: 45 }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                "--x": `${Math.random() * 100}vw`,
                                "--d": `${2 + Math.random() * 5}s`,
                                "--s": `${0.6 + Math.random() * 1.2}`,
                                "--y": `${-10 - Math.random() * 30}vh`,
                            }}
                        />
                    ))}
                </div>

                <div className="hero-inner">
                    <h1 className="title anim-rise delay-2">
                        {t('home.title')} <br />
                        {t('home.titleEnd')} <span className="grad">{t('home.titleHighlight')}</span> Context
                    </h1>

                    <p className="subtitle anim-fade delay-3">
                        {t('home.subtitle')}
                    </p>

                    <div className="cta-row anim-pop delay-4">
                        <Link className="cta" to="/translate">
                            {t('home.cta')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
