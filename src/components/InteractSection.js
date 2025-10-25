import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import "./InteractSection.css";

function InteractSection() {
    const { t, i18n } = useTranslation();

    /** Idiomas */
    const LANGS = useMemo(() => [
        { code: "auto", name: t('languages.auto') },
        { code: "en", name: t('languages.en') },
        { code: "pt", name: t('languages.pt') },
        { code: "es", name: t('languages.es') },
        { code: "fr", name: t('languages.fr') },
        { code: "de", name: t('languages.de') },
        { code: "ar", name: t('languages.ar') },
    ], [t]);

    const [text, setText] = useState("");
    const [source, setSource] = useState("auto");
    const [target, setTarget] = useState("pt");
    const [translated, setTranslated] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState("");
    const [chars, setChars] = useState(0);
    const cardRef = useRef(null);

    // micro-parallax no cartão
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
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

    // TTS
    const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
    const voices = useMemo(() => (canSpeak ? window.speechSynthesis.getVoices() || [] : []), [canSpeak]);
    useEffect(() => {
        if (!canSpeak) return;
        const handler = () => {};
        window.speechSynthesis.addEventListener("voiceschanged", handler);
        return () => window.speechSynthesis.removeEventListener("voiceschanged", handler);
    }, [canSpeak]);

    function copyToClipboard(value, which) {
        navigator.clipboard?.writeText(value || "");
        setCopied(which);
        setTimeout(() => setCopied(""), 1200);
    }

    function handleSpeak(value, langCode) {
        if (!canSpeak || !value) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(value);
        const v =
            voices.find((vv) => vv.lang?.toLowerCase().startsWith(langCode)) ||
            voices.find((vv) => vv.lang?.toLowerCase().startsWith(langCode.slice(0, 2))) ||
            voices[0];
        if (v) u.voice = v;
        window.speechSynthesis.speak(u);
    }

    async function handleTranslate() {
        setLoading(true);
        const { translatedText, culturalNotes } = await translateText({
            text,
            source,
            target,
            uiLang: i18n.language  // Enviar idioma da interface
        });
        setTranslated(translatedText);
        const src = source === "auto" ? naiveDetectLang(text) : source;
        setNotes(culturalNotes);
        setLoading(false);
        setHistory((h) => [{ input: text, output: translatedText, src, tgt: target, ts: Date.now() }, ...h].slice(0, 8));
    }

    function swapLangs() {
        const guessed = source === "auto" ? naiveDetectLang(text) : source;
        setSource(target);
        setTarget(guessed);
        if (translated) {
            setText(translated);
            setTranslated("");
            setNotes([]);
        }
    }

    return (
        <section className="interact-wrap" id="translate">
            {/* Toast de copiar */}
            <div className={`toast ${copied ? "show" : ""}`}>
                {copied === "input" ? t('translate.toastInput') : t('translate.toastOutput')}
            </div>

            <div ref={cardRef} className="interact-card anim-rise delay-2">
                <div className="glow-bg" />

                <div className="interact-head">
                    <div className="chips anim-pop delay-2">
                        <span className="chip">{t('translate.chips.contextAware')}</span>
                        <span className="chip alt">{t('translate.chips.idioms')}</span>
                        <span className="chip">{t('translate.chips.pronunciation')}</span>
                    </div>
                    <h2 className="anim-rise delay-3">{t('translate.title')}</h2>
                    <p className="anim-fade delay-4">{t('translate.subtitle')}</p>
                </div>

                <div className="row">
                    <div className="col anim-rise delay-4">
                        <label>{t('translate.from')}</label>
                        <div className="select-row">
                            <select value={source} onChange={(e) => setSource(e.target.value)} aria-label={t('translate.from')}>
                                {LANGS.map((l) => (
                                    <option key={l.code} value={l.code}>{l.name}</option>
                                ))}
                            </select>
                            <button className="ghost swap" onClick={swapLangs} title={t('translate.swap')} aria-label={t('translate.swap')}>⇄</button>
                        </div>

                        <div className="input-wrap">
                            <textarea
                                className="input"
                                placeholder={t('translate.placeholder')}
                                value={text}
                                onChange={(e) => { setText(e.target.value); setChars(e.target.value.length); }}
                                rows={6}
                            />
                            <div className="meta">
                                <span className="detected">
                                    {text ? (source === "auto" ? `${t('translate.detected')}: ${naiveDetectLang(text)}` : `${t('translate.source')}: ${source}`) : "—"}
                                </span>
                                <span className={`count ${chars > 1600 ? "warn" : ""}`}>{chars}/2000</span>
                            </div>
                        </div>

                        <div className="btn-row anim-pop delay-5">
                            <button className="primary" onClick={handleTranslate} disabled={loading || !text.trim()}>
                                {loading ? t('translate.translating') : t('translate.translateBtn')}
                            </button>
                            <button className="ghost" onClick={() => copyToClipboard(text, "input")} disabled={!text}>
                                {t('translate.copy')}
                            </button>
                            <button className="ghost" onClick={() => { setText(""); setChars(0); }} disabled={!text}>
                                {t('translate.clear')}
                            </button>
                        </div>
                    </div>

                    <div className="col anim-rise delay-5">
                        <label>{t('translate.to')}</label>
                        <select value={target} onChange={(e) => setTarget(e.target.value)} aria-label={t('translate.to')}>
                            {LANGS.filter((l) => l.code !== "auto").map((l) => (
                                <option key={l.code} value={l.code}>{l.name}</option>
                            ))}
                        </select>

                        <div className={`output ${loading ? "loading" : ""} anim-fade delay-6`} aria-live="polite">
                            {translated && !loading ? translated : (!loading ? <span className="muted">{t('translate.placeholder')}</span> : null)}
                            {loading && (
                                <div className="shimmer">
                                    <div className="line" style={{"--w":"92%"}} />
                                    <div className="line" style={{"--w":"86%"}} />
                                    <div className="line" style={{"--w":"78%"}} />
                                    <div className="line" style={{"--w":"64%"}} />
                                </div>
                            )}
                        </div>

                        <div className="btn-row anim-pop delay-6">
                            <button className="ghost" onClick={() => copyToClipboard(translated, "output")} disabled={!translated || loading}>
                                {t('translate.copy')}
                            </button>
                            <button className="ghost" onClick={() => handleSpeak(translated, target)} disabled={!translated || !canSpeak || loading}>
                                <FontAwesomeIcon icon={faVolumeHigh} /> {t('translate.chips.pronunciation')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="notes anim-rise delay-6">
                    <h3>{t('translate.culturalNotes')}</h3>
                    {notes.length ? (
                        <ul>
                            {notes.map((n, i) => (
                                <li key={i}>
                                    {typeof n === 'object' && n !== null ? (
                                        <>
                                            {n.title && <strong>{n.title} — </strong>}
                                            <span>{n.body || JSON.stringify(n)}</span>
                                        </>
                                    ) : (
                                        <span>{String(n)}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="muted">{t('translate.subtitle')}</p>
                    )}
                </div>

                {!!history.length && (
                    <div className="history anim-rise delay-6">
                        <h4>{t('translate.history')}</h4>
                        <div className="list">
                            {history.map((h) => (
                                <button
                                    key={h.ts}
                                    className="history-item"
                                    onClick={() => { setText(h.input); setTranslated(h.output); setChars(h.input.length); }}
                                    title={t('translate.history')}
                                >
                                    <span className="tag">{h.src}→{h.tgt}</span>
                                    <span className="line">{h.input.slice(0, 48)}{h.input.length > 48 ? "…" : ""}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

function naiveDetectLang(text) {
    const t = text.normalize("NFKD");
    if (/[اأإء-ي]/.test(t)) return "ar";
    if (/[áâãàéêíóôõúç]/i.test(t)) return "pt";
    if (/[ñáéíóúü]/i.test(t)) return "es";
    if (/[äöüß]/i.test(t)) return "de";
    if (/[àâçéèêëîïôùûüÿœ]/i.test(t)) return "fr";
    return "en";
}

async function translateText({ text, source, target, uiLang = 'en' }) {
    if (!text.trim()) return { translatedText: "", culturalNotes: [] };
    const src = source === "auto" ? naiveDetectLang(text) : source;
    if (src === target) return { translatedText: text, culturalNotes: [] };

    try {
        const res = await fetch("http://localhost:5000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                q: text,
                source: src,
                target,
                format: "text",
                ui_lang: uiLang  // Enviar idioma da UI ao backend
            }),
        });

        if (res.ok) {
            const data = await res.json();
            return {
                translatedText: data.translatedText || text,
                culturalNotes: data.culturalNotes || []
            };
        }
    } catch (err) {
        console.error("Translation error:", err);
    }

    // Fallback se o backend não estiver disponível
    const fallbackMessages = {
        en: { title: "Backend Offline", body: "Start the Flask server for AI-powered smart translations." },
        pt: { title: "Backend Offline", body: "Inicia o servidor Flask para traduções inteligentes com IA." },
        es: { title: "Backend Desconectado", body: "Inicia el servidor Flask para traducciones inteligentes con IA." },
        fr: { title: "Backend Hors Ligne", body: "Démarrez le serveur Flask pour des traductions intelligentes avec IA." },
        de: { title: "Backend Offline", body: "Starten Sie den Flask-Server für intelligente KI-Übersetzungen." },
        ar: { title: "الخادم غير متصل", body: "قم بتشغيل خادم Flask للحصول على ترجمات ذكية بالذكاء الاصطناعي." }
    };

    return {
        translatedText: `[${src}→${target}] ${text}`,
        culturalNotes: [fallbackMessages[uiLang] || fallbackMessages.en]
    };
}

export default InteractSection;
