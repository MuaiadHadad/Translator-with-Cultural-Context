import React from "react";
import InteractSection from "../components/InteractSection";
import ChatWidget from "../components/ChatWidget";
import "./TranslatePage.css";

export default function TranslatePage() {
    return (
        <div className="translate-page">
            <main className="anim-rise delay-3">
                <InteractSection />
            </main>

            <ChatWidget />
        </div>
    );
}
