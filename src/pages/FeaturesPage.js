import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLanguage,
    faMasksTheater,
    faVolumeHigh,
    faComments,
    faBook,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import "./FeaturesPage.css";

export default function FeaturesPage() {
    const { t } = useTranslation();

    const features = [
        {
            icon: faLanguage,
            title: t('features.smartTranslation.title'),
            description: t('features.smartTranslation.description'),
            highlights: [
                t('features.smartTranslation.highlight1'),
                t('features.smartTranslation.highlight2'),
                t('features.smartTranslation.highlight3')
            ]
        },
        {
            icon: faMasksTheater,
            title: t('features.culturalContext.title'),
            description: t('features.culturalContext.description'),
            highlights: [
                t('features.culturalContext.highlight1'),
                t('features.culturalContext.highlight2'),
                t('features.culturalContext.highlight3')
            ]
        },
        {
            icon: faVolumeHigh,
            title: t('features.tts.title'),
            description: t('features.tts.description'),
            highlights: [
                t('features.tts.highlight1'),
                t('features.tts.highlight2'),
                t('features.tts.highlight3')
            ]
        },
        {
            icon: faComments,
            title: t('features.aiChat.title'),
            description: t('features.aiChat.description'),
            highlights: [
                t('features.aiChat.highlight1'),
                t('features.aiChat.highlight2'),
                t('features.aiChat.highlight3')
            ]
        },
        {
            icon: faBook,
            title: t('features.grammar.title'),
            description: t('features.grammar.description'),
            highlights: [
                t('features.grammar.highlight1'),
                t('features.grammar.highlight2'),
                t('features.grammar.highlight3')
            ]
        },
        {
            icon: faGlobe,
            title: t('features.multilingual.title'),
            description: t('features.multilingual.description'),
            highlights: [
                t('features.multilingual.highlight1'),
                t('features.multilingual.highlight2'),
                t('features.multilingual.highlight3')
            ]
        }
    ];

    return (
        <div className="features-page">
            <div className="features-hero anim-rise delay-2">
                <h1 className="features-title">
                    {t('features.pageTitle')} <span className="grad">{t('features.pageTitleHighlight')}</span>
                </h1>
                <p className="features-subtitle anim-fade delay-3">
                    {t('features.pageSubtitle')}
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`feature-card anim-rise delay-${index % 3 + 3}`}
                        style={{ animationDelay: `${0.1 * index}s` }}
                    >
                        <div className="feature-icon">
                            <FontAwesomeIcon icon={feature.icon} />
                        </div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                        <ul className="feature-highlights">
                            {feature.highlights.map((highlight, hIndex) => (
                                <li key={hIndex}>
                                    <span className="checkmark">✓</span>
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="features-cta anim-pop delay-6">
                <h2>{t('features.ctaTitle')}</h2>
                <p>{t('features.ctaSubtitle')}</p>
                <a href="/translate" className="cta-button">
                    {t('features.ctaButton')}
                </a>
            </div>
        </div>
    );
}
