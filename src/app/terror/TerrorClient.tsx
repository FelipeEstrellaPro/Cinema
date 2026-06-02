"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

const movies = [
  {
    id: 1,
    title: "La Sombra Eterna",
    description:
      "Una familia se muda a una antigua mansión donde las sombras cobran vida propia. Lo que creían que era su hogar soñado se convierte en una pesadilla de la que no pueden escapar.",
    rating: 8.4,
    duration: "1h 58min",
    year: 2025,
    director: "Alejandro Cruz",
    cast: ["Sofía Morales", "Diego Ramírez", "Elena Vásquez"],
    badge: "ESTRENO",
  },
  {
    id: 2,
    title: "El Último Susurro",
    description:
      "Cuando los muertos comienzan a susurrar secretos a una detective, deberá enfrentarse a sus propios demonios para resolver un crimen que nadie recuerda.",
    rating: 7.9,
    duration: "2h 05min",
    year: 2025,
    director: "Carmen Ruiz",
    cast: ["Valentina Torres", "Marcos Ibáñez", "Luis Peña"],
  },
  {
    id: 3,
    title: "Oscuridad Profunda",
    description:
      "En las profundidades del océano, un equipo de investigadores descubre que no están solos. Una criatura ancestral despierta y la oscuridad se convierte en su peor enemigo.",
    rating: 8.1,
    duration: "1h 48min",
    year: 2024,
    director: "Roberto Silva",
    cast: ["Andrea López", "Carlos Mendoza", "Patricia Flores"],
    badge: "MÁS VISTO",
  },
  {
    id: 4,
    title: "Casa de Muñecas",
    description:
      "Una coleccionista de antigüedades adquiere una casa de muñecas centenaria. Pronto descubre que las muñecas no son simples juguetes: guardan almas atrapadas en su interior.",
    rating: 7.6,
    duration: "1h 52min",
    year: 2024,
    director: "Natalia Gómez",
    cast: ["Isabel Reyes", "Fernando Castro", "Ana Delgado"],
  },
];

export default function TerrorClient() {
  const [fearLevel, setFearLevel] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [clickedDrips, setClickedDrips] = useState<Record<number, boolean>>({});

  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<any>(null);

  // Web Audio API Heartbeat Synthesis
  const playHeartbeat = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      
      // THUMP-thump double beat
      const playSingleBeat = (timeOffset: number, volume: number, freq: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = "sine";
        // Frequency sweep for deep sub bass rumble
        osc.frequency.setValueAtTime(freq, now + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(15, now + timeOffset + 0.15);
        
        // Filter clicking sounds
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(70, now + timeOffset);
        
        gain.gain.setValueAtTime(0.0, now + timeOffset);
        gain.gain.linearRampToValueAtTime(volume, now + timeOffset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.18);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + timeOffset);
        osc.stop(now + timeOffset + 0.2);
      };

      // Beat 1: Stronger
      playSingleBeat(0, 0.8, 55);
      
      // Beat 2: Delayed and slightly softer
      playSingleBeat(0.16, 0.45, 50);
    } catch (error) {
      console.warn("AudioContext error:", error);
    }
  };

  // Sound scheduler based on fear level
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (soundEnabled && fearLevel > 1) {
      // Level 2 = 55 BPM (1090ms interval)
      // Level 3 = 110 BPM (545ms interval)
      const bpm = fearLevel === 3 ? 110 : 55;
      const intervalMs = (60 / bpm) * 1000;
      
      playHeartbeat();
      intervalRef.current = setInterval(playHeartbeat, intervalMs);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [soundEnabled, fearLevel]);

  // Toggle sound
  const handleToggleSound = () => {
    if (!soundEnabled) {
      // Initialize Audio Context on user gesture
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
      setSoundEnabled(true);
    } else {
      setSoundEnabled(false);
    }
  };

  // Splat/pop blood drip on click
  const handleDripClick = (index: number) => {
    setClickedDrips((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setClickedDrips((prev) => ({ ...prev, [index]: false }));
    }, 3000);
  };

  // Set page-wide classes based on fear level
  const getPageClass = () => {
    if (fearLevel === 2) return "terror-page paranormal-mode";
    if (fearLevel === 3) return "terror-page nightmare-mode";
    return "terror-page";
  };

  return (
    <div className={getPageClass()}>
      {/* Glitch Overlay for Nightmare Mode */}
      {fearLevel === 3 && <div className="crt-glitch-overlay" />}
      
      {/* ── HERO ── */}
      <section className="terror-hero">
        <div className="terror-hero-bg" />

        {/* Dynamic Interactive Blood Drips */}
        <div className="terror-drips">
          {[...Array(fearLevel === 3 ? 16 : 8)].map((_, i) => {
            const isClicked = clickedDrips[i];
            return (
              <div
                key={i}
                className={`drip ${isClicked ? "splatted" : ""}`}
                style={{
                  left: `${5 + i * (fearLevel === 3 ? 6.2 : 12)}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${(fearLevel === 3 ? 2 : 4) + (i % 3)}s`,
                  height: `${50 + (i % 4) * 25}px`,
                  background: isClicked ? "transparent" : undefined,
                }}
                onClick={() => handleDripClick(i)}
                title="Toca para salpicar sangre"
              />
            );
          })}
        </div>

        <div className="terror-hero-image-wrap">
          <Image
            src="/terror.png"
            alt="Terror"
            fill
            priority
            className="terror-hero-img"
            sizes="100vw"
          />
          <div className="terror-hero-vignette" />
        </div>

        <div className="terror-hero-content">
          <div className="terror-eyebrow">
            <span className="terror-skull animate-bounce">💀</span>
            <span className="tracking-widest">
              {fearLevel === 3 ? "SYSTEM FAULT · SYSTEM FAULT" : "Sección de Terror"}
            </span>
            <span className="terror-skull animate-bounce">💀</span>
          </div>
          
          <h1 className="terror-title">
            <span className={`terror-title-main ${fearLevel === 3 ? "glitch-active" : ""}`} data-text="TERROR">
              TERROR
            </span>
            <span className="terror-title-sub">
              {fearLevel === 3 ? "N O   P U E D E S   E S C A P A R" : "¿Te atreves a mirar?"}
            </span>
          </h1>

          <p className="terror-desc">
            {fearLevel === 3 
              ? "Las pesadillas se han materializado. Has cruzado el umbral del que no hay retorno. Que las sombras te guíen..."
              : "Sumérgete en las profundidades del miedo. Películas que te harán dormir con la luz encendida. Sólo para los más valientes."
            }
          </p>

          {/* Interactive Fear Control Panel */}
          <div className="fear-control-card animate-fade-in">
            <div className="fear-header-row">
              <span className="fear-panel-icon">{fearLevel === 3 ? "🔥" : "🔮"}</span>
              <span className="fear-panel-title">NIVEL DE MIEDO: {fearLevel === 1 ? "SUSPENSO" : fearLevel === 2 ? "PARANORMAL" : "PESADILLA"}</span>
            </div>

            <div className="slider-wrapper">
              <input
                type="range"
                min="1"
                max="3"
                value={fearLevel}
                onChange={(e) => setFearLevel(Number(e.target.value))}
                className="fear-slider-input"
              />
              <div className="slider-markers">
                <span className={fearLevel === 1 ? "marker active" : "marker"} onClick={() => setFearLevel(1)}>Suspenso</span>
                <span className={fearLevel === 2 ? "marker active" : "marker"} onClick={() => setFearLevel(2)}>Paranormal</span>
                <span className={fearLevel === 3 ? "marker active" : "marker"} onClick={() => setFearLevel(3)}>Pesadilla</span>
              </div>
            </div>

            <div className="fear-footer-row">
              <button 
                onClick={handleToggleSound} 
                className={`sound-btn ${soundEnabled ? "sound-on" : "sound-off"}`}
              >
                <span className="btn-icon">{soundEnabled ? "🔊" : "🔇"}</span>
                <span>
                  {soundEnabled 
                    ? `Latidos Activos (${fearLevel === 3 ? "Rápidos" : fearLevel === 1 ? "Activa Modo 2 o 3" : "Tensos"})` 
                    : "Activar Sonido Inmersivo"
                  }
                </span>
              </button>
              {soundEnabled && fearLevel === 1 && (
                <div className="sound-hint animate-pulse">
                  *Sube el nivel de miedo para oír el latido...
                </div>
              )}
            </div>
          </div>

          <div className="terror-warning">
            {fearLevel === 3 
              ? "⚠ ADVERTENCIA: RIESGO DE PESADILLAS EXTREMAS · NO APTO PARA CARDÍACOS" 
              : "⚠ Contenido perturbador · No apto para cardíacos"
            }
          </div>
        </div>

        {/* Fog effect */}
        <div className="terror-fog" />
      </section>

      {/* ── STATS BAR ── */}
      <div className="terror-stats-bar">
        <div className="terror-stat">
          <span className="terror-stat-num">{fearLevel === 3 ? "ERR" : "4"}</span>
          <span className="terror-stat-lbl">Películas</span>
        </div>
        <div className="terror-stat-sep" />
        <div className="terror-stat">
          <span className="terror-stat-num">{fearLevel === 3 ? "6.66" : "8.0"}</span>
          <span className="terror-stat-lbl">Rating prom.</span>
        </div>
        <div className="terror-stat-sep" />
        <div className="terror-stat">
          <span className="terror-stat-num">{fearLevel === 3 ? "💥💥💥" : "2024–25"}</span>
          <span className="terror-stat-lbl">Temporada</span>
        </div>
        <div className="terror-stat-sep" />
        <div className="terror-stat">
          <span className="terror-stat-num">🔞</span>
          <span className="terror-stat-lbl">Clasificación</span>
        </div>
      </div>

      {/* ── MOVIES ── */}
      <section className="terror-movies-section">
        <h2 className="terror-movies-title">
          <span className="terror-title-accent">EN CARTELERA</span>
        </h2>
        <div className="movies-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card-wrapper">
              <MovieCard movie={movie} accentColor={fearLevel === 3 ? "#990000" : "#ef4444"} />
            </div>
          ))}
        </div>
      </section>

      {/* ── BACK NAV ── */}
      <div className="page-nav-footer">
        <Link href="/" className="back-btn">← Volver a la cartelera</Link>
        <div className="page-nav-other">
          <Link href="/romance" className="page-nav-link romance-link">🌹 Romance</Link>
          <Link href="/comedia" className="page-nav-link comedia-link">🎭 Comedia</Link>
        </div>
      </div>

      <style>{`
        .terror-page {
          background: #080408;
          min-height: 100vh;
          position: relative;
          transition: background 0.8s ease;
        }
        
        .terror-page.paranormal-mode {
          background: #040104;
          animation: ambient-flicker 15s infinite;
        }

        .terror-page.nightmare-mode {
          background: #000000;
          animation: extreme-flicker 6s infinite;
        }

        /* CRT Glitch Overlay */
        .crt-glitch-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          background-size: 100% 4px, 6px 100%;
          z-index: 999;
          pointer-events: none;
          opacity: 0.85;
          animation: crt-jitter 0.15s infinite;
        }

        @keyframes crt-jitter {
          0% { transform: translateY(0px); }
          50% { transform: translateY(1px); }
          100% { transform: translateY(-0.5px); }
        }

        /* HERO */
        .terror-hero {
          position: relative;
          min-height: 95vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .terror-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, #4a000088 0%, transparent 60%);
          z-index: 2;
          transition: background 0.8s ease;
        }

        .nightmare-mode .terror-hero-bg {
          background: radial-gradient(ellipse 70% 50% at 50% 20%, #990000aa 0%, transparent 50%);
        }

        .terror-hero-image-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .terror-hero-img {
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.5) brightness(0.5);
          transition: transform 8s ease, filter 0.8s ease;
        }

        .paranormal-mode .terror-hero-img {
          filter: saturate(0.3) brightness(0.35) contrast(1.1);
        }

        .nightmare-mode .terror-hero-img {
          filter: saturate(0.1) brightness(0.18) contrast(1.4) hue-rotate(-10deg);
          transform: scale(1.06) rotate(0.5deg);
        }

        .terror-hero-img:hover { transform: scale(1.04); }

        .terror-hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,4,8,0.3) 0%,
            transparent 30%,
            rgba(8,4,8,0.85) 70%,
            #080408 100%
          );
          transition: background 0.8s ease;
        }

        .paranormal-mode .terror-hero-vignette {
          background: linear-gradient(
            to bottom,
            rgba(4,1,4,0.4) 0%,
            transparent 30%,
            rgba(4,1,4,0.92) 65%,
            #040104 100%
          );
        }

        .nightmare-mode .terror-hero-vignette {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.6) 0%,
            transparent 25%,
            rgba(0,0,0,0.98) 60%,
            #000000 100%
          );
        }

        /* DRIPS */
        .terror-drips {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          pointer-events: auto;
        }

        .drip {
          position: absolute;
          top: 0;
          width: 3px;
          background: linear-gradient(to bottom, #cc0000, #880000);
          border-radius: 0 0 5px 5px;
          animation: drip-fall 4s ease-in-out infinite alternate;
          opacity: 0.7;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.3s ease;
        }

        .drip:hover {
          opacity: 1;
          transform: scaleX(2.5);
          background: #ff0000;
        }

        .nightmare-mode .drip {
          width: 4px;
          opacity: 0.95;
          animation-duration: 2.2s;
          background: linear-gradient(to bottom, #ff0000, #440000);
        }

        /* Blood Splat effect on clicked drip */
        .drip.splatted {
          animation: none;
          transform: scale(0);
          opacity: 0;
        }

        .drip.splatted::after {
          content: '💥';
          position: absolute;
          bottom: 0;
          left: -8px;
          font-size: 14px;
          animation: splat-out 0.5s ease-out forwards;
        }

        @keyframes splat-out {
          0% { transform: scale(0.2); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        @keyframes drip-fall {
          from { transform: scaleY(0.25); opacity: 0.45; }
          to   { transform: scaleY(1);   opacity: 0.85; }
        }

        /* HERO CONTENT */
        .terror-hero-content {
          position: relative;
          z-index: 10;
          padding: 60px 48px 60px;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
        }

        .terror-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #ef4444;
          margin-bottom: 20px;
        }

        .nightmare-mode .terror-eyebrow {
          color: #ff0000;
          text-shadow: 0 0 10px #ff0000;
        }

        .terror-skull {
          animation: pulse-skull 1.5s ease-in-out infinite alternate;
        }

        @keyframes pulse-skull {
          from { transform: scale(1);    opacity: 0.7; }
          to   { transform: scale(1.3); opacity: 1;   }
        }

        .terror-title {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .terror-title-main {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(5rem, 14vw, 11rem);
          line-height: 0.85;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, #ffffff 0%, #ff4444 50%, #880000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          filter: drop-shadow(0 0 30px rgba(255,0,0,0.4));
          position: relative;
        }

        .nightmare-mode .terror-title-main {
          background: linear-gradient(135deg, #ff0000 0%, #880000 50%, #220000 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(255,0,0,0.85));
        }

        /* Glitch Effect on Title for Nightmare mode */
        .glitch-active {
          position: relative;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }

        .glitch-active::before,
        .glitch-active::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-active::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c8;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch-active::after {
          left: -2px;
          text-shadow: -2px 0 #00e6ff, 0 2px #ff00c8;
          clip: rect(85px, 450px, 140px, 0);
          animation: glitch-anim2 5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim {
          0% { clip: rect(15px, 9999px, 66px, 0); }
          10% { clip: rect(112px, 9999px, 76px, 0); }
          20% { clip: rect(85px, 9999px, 5px, 0); }
          30% { clip: rect(27px, 9999px, 115px, 0); }
          40% { clip: rect(76px, 9999px, 98px, 0); }
          50% { clip: rect(120px, 9999px, 45px, 0); }
          60% { clip: rect(9px, 9999px, 130px, 0); }
          70% { clip: rect(88px, 9999px, 20px, 0); }
          80% { clip: rect(32px, 9999px, 95px, 0); }
          90% { clip: rect(142px, 9999px, 60px, 0); }
          100% { clip: rect(50px, 9999px, 110px, 0); }
        }

        @keyframes glitch-anim2 {
          0% { clip: rect(129px, 9999px, 36px, 0); }
          10% { clip: rect(56px, 9999px, 120px, 0); }
          20% { clip: rect(9px, 9999px, 42px, 0); }
          30% { clip: rect(88px, 9999px, 105px, 0); }
          40% { clip: rect(12px, 9999px, 85px, 0); }
          50% { clip: rect(78px, 9999px, 148px, 0); }
          60% { clip: rect(115px, 9999px, 15px, 0); }
          70% { clip: rect(43px, 9999px, 92px, 0); }
          80% { clip: rect(95px, 9999px, 63px, 0); }
          90% { clip: rect(22px, 9999px, 130px, 0); }
          100% { clip: rect(104px, 9999px, 8px, 0); }
        }

        @keyframes glitch-skew {
          0% { transform: skew(1deg); }
          10% { transform: skew(-2deg); }
          20% { transform: skew(0deg); }
          30% { transform: skew(3deg); }
          40% { transform: skew(-1deg); }
          50% { transform: skew(2deg); }
          60% { transform: skew(0deg); }
          70% { transform: skew(-3deg); }
          80% { transform: skew(1deg); }
          90% { transform: skew(0deg); }
          100% { transform: skew(2deg); }
        }

        .terror-title-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-style: italic;
          color: #ef4444;
          margin-top: 8px;
          transition: color 0.5s ease;
        }

        .nightmare-mode .terror-title-sub {
          color: #ff0000;
          font-weight: 700;
          letter-spacing: 0.1em;
          animation: text-pulse 1s infinite alternate;
        }

        @keyframes text-pulse {
          from { opacity: 0.6; text-shadow: 0 0 5px #ff0000; }
          to { opacity: 1; text-shadow: 0 0 20px #ff0000; }
        }

        .terror-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 24px;
          transition: color 0.5s ease;
        }

        .nightmare-mode .terror-desc {
          color: rgba(255, 100, 100, 0.7);
        }

        /* FEAR CONTROL CARD (GLASSMORPHIC) */
        .fear-control-card {
          background: rgba(30, 10, 10, 0.45);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 16px;
          padding: 24px;
          max-width: 520px;
          margin-bottom: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(239, 68, 68, 0.05);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .fear-control-card:hover {
          border-color: rgba(239, 68, 68, 0.45);
          box-shadow: 0 15px 45px rgba(239, 68, 68, 0.15), inset 0 0 20px rgba(239, 68, 68, 0.1);
        }

        .paranormal-mode .fear-control-card {
          background: rgba(15, 2, 2, 0.65);
          border-color: rgba(239, 68, 68, 0.4);
          box-shadow: 0 15px 45px rgba(239, 68, 68, 0.2), inset 0 0 25px rgba(239, 68, 68, 0.15);
        }

        .nightmare-mode .fear-control-card {
          background: rgba(0, 0, 0, 0.9);
          border-color: #ff0000;
          box-shadow: 0 0 30px rgba(255, 0, 0, 0.4), inset 0 0 35px rgba(255, 0, 0, 0.25);
          animation: panel-glow 2s infinite alternate;
        }

        @keyframes panel-glow {
          from { border-color: #880000; box-shadow: 0 0 15px rgba(255,0,0,0.2); }
          to { border-color: #ff0000; box-shadow: 0 0 30px rgba(255,0,0,0.5); }
        }

        .fear-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .fear-panel-icon {
          font-size: 1.5rem;
          animation: control-icon-float 3s ease-in-out infinite alternate;
        }

        @keyframes control-icon-float {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-4px) rotate(10deg); }
        }

        .fear-panel-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.25rem;
          letter-spacing: 0.08em;
          color: #f0f0f0;
          text-shadow: 0 0 10px rgba(255,255,255,0.1);
        }

        .nightmare-mode .fear-panel-title {
          color: #ff0000;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.6);
        }

        .slider-wrapper {
          margin-bottom: 24px;
        }

        .fear-slider-input {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          transition: background 0.3s;
          cursor: pointer;
        }

        .fear-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
          transition: transform 0.2s, background 0.2s;
        }

        .fear-slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .nightmare-mode .fear-slider-input::-webkit-slider-thumb {
          background: #ff0000;
          border-color: #ff0000;
          box-shadow: 0 0 20px #ff0000;
        }

        .slider-markers {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding: 0 4px;
        }

        .marker {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s;
        }

        .marker:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .marker.active {
          color: #ef4444;
          font-weight: 700;
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
        }

        .nightmare-mode .marker.active {
          color: #ff0000;
          text-shadow: 0 0 12px #ff0000;
        }

        .fear-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .sound-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .sound-off {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.75);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .sound-off:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .sound-on {
          background: rgba(239, 68, 68, 0.12);
          color: #ef4444;
          border-color: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.25);
          animation: sonar-pulse 1.8s infinite alternate;
        }

        @keyframes sonar-pulse {
          0% { box-shadow: 0 0 5px rgba(239, 68, 68, 0.2); }
          100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); }
        }

        .nightmare-mode .sound-on {
          background: rgba(255, 0, 0, 0.25);
          color: #ff0000;
          border-color: #ff0000;
          animation: nightmare-sonar 1s infinite alternate;
        }

        @keyframes nightmare-sonar {
          0% { box-shadow: 0 0 8px rgba(255,0,0,0.3); }
          100% { box-shadow: 0 0 25px rgba(255,0,0,0.85); }
        }

        .sound-hint {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        }

        .terror-warning {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.35);
          border-radius: 6px;
          font-size: 0.75rem;
          color: #ef4444;
          letter-spacing: 0.05em;
          transition: all 0.5s ease;
        }

        .nightmare-mode .terror-warning {
          background: rgba(255, 0, 0, 0.2);
          border-color: #ff0000;
          color: #ff0000;
          box-shadow: 0 0 15px rgba(255, 0, 0, 0.35);
        }

        /* FOG */
        .terror-fog {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, #080408, transparent);
          z-index: 4;
          pointer-events: none;
          transition: background 0.8s ease;
        }

        .paranormal-mode .terror-fog {
          background: linear-gradient(to top, #040104, transparent);
          animation: fog-breath 8s ease-in-out infinite alternate;
        }

        .nightmare-mode .terror-fog {
          background: linear-gradient(to top, #000000, transparent);
          animation: fog-breath 4s ease-in-out infinite alternate;
        }

        @keyframes fog-breath {
          0% { transform: translateY(0px) scaleY(1); opacity: 0.8; }
          100% { transform: translateY(-15px) scaleY(1.3); opacity: 1; }
        }

        /* STATS BAR */
        .terror-stats-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 28px 32px;
          background: rgba(239,68,68,0.06);
          border-top: 1px solid rgba(239,68,68,0.15);
          border-bottom: 1px solid rgba(239,68,68,0.15);
          transition: all 0.8s ease;
        }

        .paranormal-mode .terror-stats-bar {
          background: rgba(239,68,68,0.02);
          border-color: rgba(239,68,68,0.25);
        }

        .nightmare-mode .terror-stats-bar {
          background: rgba(10, 0, 0, 0.8);
          border-color: rgba(255, 0, 0, 0.4);
          box-shadow: inset 0 0 15px rgba(255,0,0,0.05);
        }

        .terror-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .terror-stat-num {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          color: #ef4444;
          line-height: 1;
          transition: color 0.5s ease, text-shadow 0.5s ease;
        }

        .nightmare-mode .terror-stat-num {
          color: #ff0000;
          text-shadow: 0 0 12px #ff0000;
        }

        .terror-stat-lbl {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .terror-stat-sep {
          width: 1px;
          height: 40px;
          background: rgba(239,68,68,0.2);
          transition: background 0.8s ease;
        }

        .nightmare-mode .terror-stat-sep {
          background: rgba(255, 0, 0, 0.35);
        }

        /* MOVIES SECTION */
        .terror-movies-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 64px 48px 80px;
        }

        .terror-movies-title {
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
          transition: color 0.5s ease;
        }

        .nightmare-mode .terror-movies-title {
          color: #ff0000;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        }

        .terror-movies-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(239,68,68,0.25);
          transition: background 0.8s ease;
        }

        .nightmare-mode .terror-movies-title::after {
          background: rgba(255, 0, 0, 0.35);
        }

        .terror-title-accent { color: #ef4444; transition: color 0.5s ease; }
        .nightmare-mode .terror-title-accent { color: #ff0000; }

        /* MOVIE CARDS CUSTOM GLOW ON HOVER */
        .movie-card-wrapper {
          position: relative;
          border-radius: 16px;
        }

        .movie-card-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at center, rgba(239, 68, 68, 0.25) 0%, transparent 70%);
          z-index: 0;
          opacity: 0;
          transform: scale(0.85);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .movie-card-wrapper:hover::before {
          opacity: 1;
          transform: scale(1.15);
        }

        .nightmare-mode .movie-card-wrapper::before {
          background: radial-gradient(circle at center, rgba(255, 0, 0, 0.45) 0%, transparent 60%);
        }

        /* BOTTOM NAV */
        .page-nav-footer {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
          z-index: 10;
        }

        .page-nav-other {
          display: flex;
          gap: 12px;
        }

        .page-nav-link {
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid;
          transition: all 0.3s ease;
        }

        .romance-link {
          color: #ec4899;
          border-color: rgba(236,72,153,0.3);
          background: rgba(236,72,153,0.06);
        }

        .romance-link:hover {
          background: rgba(236,72,153,0.15);
        }

        .comedia-link {
          color: #f59e0b;
          border-color: rgba(245,158,11,0.3);
          background: rgba(245,158,11,0.06);
        }

        .comedia-link:hover {
          background: rgba(245,158,11,0.15);
        }

        /* AMBIENT LIGHTS FLICKER EFFECT */
        @keyframes ambient-flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
            opacity: 0.94;
            filter: brightness(0.85) contrast(1.05);
          }
        }

        @keyframes extreme-flicker {
          0%, 19.999%, 22%, 25.999%, 27%, 42.999%, 44%, 55.999%, 58%, 78.999%, 81%, 100% {
            filter: brightness(1) contrast(1);
          }
          20%, 21.999%, 26%, 26.999%, 43%, 43.999%, 56%, 57.999%, 79%, 80.999% {
            filter: brightness(0.4) contrast(1.5) saturate(1.8) hue-rotate(-5deg);
          }
        }

        @media (max-width: 768px) {
          .terror-hero-content { padding: 40px 20px 40px; }
          .terror-movies-section { padding: 48px 20px 60px; }
          .page-nav-footer { padding: 0 20px 60px; }
          .terror-stats-bar { gap: 20px; flex-wrap: wrap; }
          .fear-control-card { padding: 16px; }
          .fear-footer-row { flex-direction: column; align-items: stretch; }
          .sound-btn { width: 100%; justify-content: center; }
          .sound-hint { text-align: center; }
        }
      `}</style>
    </div>
  );
}
