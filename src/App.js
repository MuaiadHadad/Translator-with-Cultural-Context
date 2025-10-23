import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import HomePage from "./pages/HomePage";
import TranslatePage from "./pages/TranslatePage";
import "./App.css";
import "./styles/anim.css";

export default function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [loaded]);

    return (
        <BrowserRouter>
            {!loaded && <Loader onDone={() => setLoaded(true)} />}

            {loaded && (
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/translate" element={<TranslatePage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}
