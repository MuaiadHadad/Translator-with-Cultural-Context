/**
 * Main Application Component
 * Handles routing and initial loading state for the translation application
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import TranslatePage from "./pages/TranslatePage";
import GrammarPage from "./pages/GrammarPage";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";
import "./styles/anim.css";
import "./i18n/config"; // Initialize i18next configuration

export default function App() {
    // Track loading state for initial animation
    const [loaded, setLoaded] = useState(false);

    // Control body scroll during loading
    useEffect(() => {
        if (!loaded) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [loaded]);

    return (
        <BrowserRouter>
            {/* Show loader animation on first load */}
            {!loaded && <Loader onDone={() => setLoaded(true)} />}

            {/* Main application content after loading */}
            {loaded && (
                <>
                    <Header />
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/translate" element={<TranslatePage />} />
                        <Route path="/grammar" element={<GrammarPage />} />
                        <Route path="/features" element={<FeaturesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </>
            )}
        </BrowserRouter>
    );
}
