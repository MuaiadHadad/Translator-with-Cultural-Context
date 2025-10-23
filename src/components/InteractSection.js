import React, { useEffect, useMemo, useRef, useState } from "react";
import "./InteractSection.css";

/** Idiomas */
const LANGS = [
    { code: "auto", name: "Auto-detectar" },
    { code: "en", name: "English" },
    { code: "pt", name: "Português" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "ar", name: "العربية" },
];

function naiveDetectLang(text) {
    const t = text.normalize("NFKD");
    if (/[اأإء-ي]/.test(t)) return "ar";
    if (/[áâãàéêíóôõúç]/i.test(t)) return "pt";
    if (/[ñáéíóúü]/i.test(t)) return "es";
    if (/[äöüß]/i.test(t)) return "de";
    if (/[àâçéèêëîïôùûüÿœ]/i.test(t)) return "fr";
    return "en";
}

async function translateText({ text, source, target }) {
    if (!text.trim()) return "";
    const src = source === "auto" ? naiveDetectLang(text) : source;
    if (src === target) return text;
    try {
        const res = await fetch("http://localhost:5000/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ q: text, source: src, target, format: "text" }),
        });
        if (res.ok) {
            const data = await res.json();
            return data.translatedText || text;
        }
    } catch {}
    return `[${src}→${target}] ${text}`;
}

function buildCulturalNotes(src, tgt, input, output) {
    const notes = [];
    if (/^\s*cheers!?$/i.test(input)) {
        notes.push({ title: "Gíria britânica: Cheers", body: "Pode significar 'obrigado' (UK) ou 'saúde' (brinde). Em contextos formais, evite." });
    }
    if (/\bbom apetite\b|bon app[ée]tit/i.test(input)) {
        notes.push({ title: "Expressão cultural", body: "Em PT-EU usa-se 'bom apetite'. Em EN é comum omitir ou usar 'enjoy your meal'." });
    }
    if (src === "ar") {
        notes.push({ title: "Nuances árabe → ocidente", body: "“insha’Allah”, “yalla” carregam contexto cultural. Traduza apenas se fizer sentido ao leitor." });
    }
    if (!notes.length) notes.push({ title: "Dica", body: "Evita traduções literais de gírias. Ajusta o tom (formal/informal) ao canal." });
    return notes;
}

export default function InteractSection() {
    const [text, setText] = useState("");
    const [source, setSource] = useState("auto");
    const [target, setTarget] = useState("pt");
    const [translated, setTranslated] = useState("");
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [copied, setCopied] = useState(""); // "input" | "output" | ""
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
        const out = await translateText({ text, source, target });
        setTranslated(out);
        const src = source === "auto" ? naiveDetectLang(text) : source;
        setNotes(buildCulturalNotes(src, target, text, out));
        setLoading(false);
        setHistory((h) => [{ input: text, output: out, src, tgt: target, ts: Date.now() }, ...h].slice(0, 8));
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
            <div className={`toast ${copied ? "show" : ""}`}>{copied === "input" ? "Texto copiado!" : "Tradução copiada!"}</div>

            <div ref={cardRef} className="interact-card anim-rise delay-2">
                <div className="glow-bg" />

                <div className="interact-head">
                    <div className="chips anim-pop delay-2">
                        <span className="chip">Context-Aware</span>
                        <span className="chip alt">Idioms • Slang</span>
                        <span className="chip">Pronunciation</span>
                    </div>
                    <h2 className="anim-rise delay-3">Tradução com Contexto Cultural</h2>
                    <p className="anim-fade delay-4">Escreve o texto, escolhe os idiomas e recebe tradução + notas culturais.</p>
                </div>

                <div className="row">
                    <div className="col anim-rise delay-4">
                        <label>De</label>
                        <div className="select-row">
                            <select value={source} onChange={(e) => setSource(e.target.value)} aria-label="Idioma de origem">
                                {LANGS.map((l) => (
                                    <option key={l.code} value={l.code}>{l.name}</option>
                                ))}
                            </select>
                            <button className="ghost swap" onClick={swapLangs} title="Trocar idiomas" aria-label="Trocar idiomas">⇄</button>
                        </div>

                        <div className="input-wrap">
              <textarea
                  className="input"
                  placeholder="Escreve o texto aqui..."
                  value={text}
                  onChange={(e) => { setText(e.target.value); setChars(e.target.value.length); }}
                  rows={6}
              />
                            <div className="meta">
                <span className="detected">
                  {text ? (source === "auto" ? `Detetado: ${naiveDetectLang(text)}` : `Origem: ${source}`) : "—"}
                </span>
                                <span className={`count ${chars > 1600 ? "warn" : ""}`}>{chars}/2000</span>
                            </div>
                        </div>

                        <div className="btn-row anim-pop delay-5">
                            <button className="primary" onClick={handleTranslate} disabled={loading || !text.trim()}>
                                {loading ? "A traduzir…" : "Traduzir"}
                            </button>
                            <button className="ghost" onClick={() => copyToClipboard(text, "input")} disabled={!text}>
                                Copiar
                            </button>
                            <button className="ghost" onClick={() => { setText(""); setChars(0); }} disabled={!text}>
                                Limpar
                            </button>
                        </div>
                    </div>

                    <div className="col anim-rise delay-5">
                        <label>Para</label>
                        <select value={target} onChange={(e) => setTarget(e.target.value)} aria-label="Idioma de destino">
                            {LANGS.filter((l) => l.code !== "auto").map((l) => (
                                <option key={l.code} value={l.code}>{l.name}</option>
                            ))}
                        </select>

                        <div className={`output ${loading ? "loading" : ""} anim-fade delay-6`} aria-live="polite">
                            {translated && !loading ? translated : (!loading ? <span className="muted">A tradução aparecerá aqui…</span> : null)}
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
                                Copiar
                            </button>
                            <button className="ghost" onClick={() => handleSpeak(translated, target)} disabled={!translated || !canSpeak || loading}>
                                🔊 Ouvir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="notes anim-rise delay-6">
                    <h3>Contexto Cultural</h3>
                    {notes.length ? (
                        <ul>
                            {notes.map((n, i) => (
                                <li key={i}><strong>{n.title} — </strong><span>{n.body}</span></li>
                            ))}
                        </ul>
                    ) : (
                        <p className="muted">Quando houver texto, mostramos aqui gírias, expressões e dicas de uso.</p>
                    )}
                </div>

                {!!history.length && (
                    <div className="history anim-rise delay-6">
                        <h4>Histórico recente</h4>
                        <div className="list">
                            {history.map((h) => (
                                <button
                                    key={h.ts}
                                    className="history-item"
                                    onClick={() => { setText(h.input); setTranslated(h.output); setChars(h.input.length); }}
                                    title="Carregar no editor"
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
