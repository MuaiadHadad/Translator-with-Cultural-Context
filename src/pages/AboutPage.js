import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRobot,
    faPalette,
    faLaptopCode,
    faEarthAmericas,
    faGlobeAmericas,
    faGraduationCap,
    faHandshake
} from "@fortawesome/free-solid-svg-icons";
import "./AboutPage.css";

export default function AboutPage() {
    const { t } = useTranslation();

    const stats = [
        { number: "6+", label: t('about.stats.languages') },
        { number: "AI", label: t('about.stats.powered') },
        { number: "100%", label: t('about.stats.free') },
        { number: "∞", label: t('about.stats.translations') }
    ];

    const team = [
        {
            role: t('about.team.ai.role'),
            description: t('about.team.ai.description'),
            icon: faRobot
        },
        {
            role: t('about.team.design.role'),
            description: t('about.team.design.description'),
            icon: faPalette
        },
        {
            role: t('about.team.dev.role'),
            description: t('about.team.dev.description'),
            icon: faLaptopCode
        },
        {
            role: t('about.team.community.role'),
            description: t('about.team.community.description'),
            icon: faEarthAmericas
        }
    ];

    return (
        <div className="about-page">
            <div className="about-hero anim-rise delay-2">
                <h1 className="about-title">
                    {t('about.pageTitle')} <span className="grad">{t('about.pageTitleHighlight')}</span>
                </h1>
                <p className="about-subtitle anim-fade delay-3">
                    {t('about.pageSubtitle')}
                </p>
            </div>

            <div className="about-stats anim-rise delay-3">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-number">{stat.number}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="about-content">
                <section className="about-section anim-rise delay-4">
                    <h2>{t('about.mission.title')}</h2>
                    <p>{t('about.mission.text1')}</p>
                    <p>{t('about.mission.text2')}</p>
                </section>

                <section className="about-section anim-rise delay-4">
                    <h2>{t('about.vision.title')}</h2>
                    <p>{t('about.vision.text')}</p>
                    <div className="vision-cards">
                        <div className="vision-card">
                            <span className="vision-icon">
                                <FontAwesomeIcon icon={faGlobeAmericas} />
                            </span>
                            <h4>{t('about.vision.card1.title')}</h4>
                            <p>{t('about.vision.card1.description')}</p>
                        </div>
                        <div className="vision-card">
                            <span className="vision-icon">
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </span>
                            <h4>{t('about.vision.card2.title')}</h4>
                            <p>{t('about.vision.card2.description')}</p>
                        </div>
                        <div className="vision-card">
                            <span className="vision-icon">
                                <FontAwesomeIcon icon={faHandshake} />
                            </span>
                            <h4>{t('about.vision.card3.title')}</h4>
                            <p>{t('about.vision.card3.description')}</p>
                        </div>
                    </div>
                </section>

                <section className="about-section anim-rise delay-5">
                    <h2>{t('about.technology.title')}</h2>
                    <p>{t('about.technology.text')}</p>
                    <div className="tech-stack">
                        <div className="tech-item">
                            <span className="tech-badge">React 19</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-badge">OpenAI GPT-4o</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-badge">Python Flask</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-badge">i18next</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-badge">SQLite</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-badge">GitHub Models</span>
                        </div>
                    </div>
                </section>

                <section className="about-section anim-rise delay-5">
                    <h2>{t('about.team.title')}</h2>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-icon">
                                    <FontAwesomeIcon icon={member.icon} />
                                </div>
                                <h3>{member.role}</h3>
                                <p>{member.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="about-section about-cta anim-pop delay-6">
                    <h2>{t('about.cta.title')}</h2>
                    <p>{t('about.cta.text')}</p>
                    <div className="cta-buttons">
                        <a href="/translate" className="cta-primary">
                            {t('about.cta.button1')}
                        </a>
                        <a href="https://github.com" className="cta-secondary" target="_blank" rel="noopener noreferrer">
                            {t('about.cta.button2')}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
