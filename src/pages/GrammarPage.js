import React from "react";
import { useTranslation } from "react-i18next";
import GrammarSection from "../components/GrammarSection";
import ChatWidget from "../components/ChatWidget";
import "./GrammarPage.css";

export default function GrammarPage() {
    const { t } = useTranslation();

    return (
        <div className="grammar-page">
            <main className="anim-rise delay-3">
                <GrammarSection />
            </main>

            <ChatWidget />
        </div>
    );
}

