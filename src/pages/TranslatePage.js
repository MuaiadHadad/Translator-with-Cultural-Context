import React from "react";
import InteractSection from "../components/InteractSection";
import Navbar from "../components/Navbar";
import "./TranslatePage.css";

export default function TranslatePage() {
    return (
        <div className="translate-page">
            <Navbar />

            <main className="anim-rise delay-3">
                <InteractSection />
            </main>
        </div>
    );
}
