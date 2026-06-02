import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MovieCard from "@/components/MovieCard";

export const metadata: Metadata = {
  title: "💀 Terror | CineMax — ¿Te atreves a mirar?",
  description:
    "Las películas de terror más aterradoras del año. Suspenso, horror y miedo en estado puro. Sólo para los más valientes.",
  keywords: "terror, horror, miedo, películas de terror, CineMax",
};

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

export default function TerrorPage() {
  return (
    <div className="terror-page">
      {/* ── HERO ── */}
      <section className="terror-hero">
        <div className="terror-hero-bg" />

        {/* Animated blood drips */}
        <div className="terror-drips">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="drip"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + (i % 3)}s`,
                height: `${40 + (i % 4) * 20}px`,
              }}
            />
          ))}
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
            <span className="terror-skull">💀</span>
            <span>Sección de Terror</span>
            <span className="terror-skull">💀</span>
          </div>
          <h1 className="terror-title">
            <span className="terror-title-main">TERROR</span>
            <span className="terror-title-sub">¿Te atreves a mirar?</span>
          </h1>
          <p className="terror-desc">
            Sumérgete en las profundidades del miedo. Películas que te harán
            dormir con la luz encendida. Sólo para los más valientes.
          </p>
          <div className="terror-warning">
            ⚠ Contenido perturbador · No apto para cardíacos
          </div>
        </div>

        {/* Fog effect */}
        <div className="terror-fog" />
      </section>

      {/* ── STATS BAR ── */}
      <div className="terror-stats-bar">
        <div className="terror-stat">
          <span className="terror-stat-num">4</span>
          <span className="terror-stat-lbl">Películas</span>
        </div>
        <div className="terror-stat-sep" />
        <div className="terror-stat">
          <span className="terror-stat-num">8.0</span>
          <span className="terror-stat-lbl">Rating prom.</span>
        </div>
        <div className="terror-stat-sep" />
        <div className="terror-stat">
          <span className="terror-stat-num">2024–25</span>
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
            <MovieCard key={movie.id} movie={movie} accentColor="#ef4444" />
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
        }

        /* HERO */
        .terror-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .terror-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 0%, #4a000088 0%, transparent 60%);
          z-index: 2;
        }

        .terror-hero-image-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .terror-hero-img {
          object-fit: cover;
          object-position: center top;
          filter: saturate(0.6) brightness(0.55);
          transition: transform 8s ease;
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
        }

        /* DRIPS */
        .terror-drips {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          pointer-events: none;
        }

        .drip {
          position: absolute;
          top: 0;
          width: 3px;
          background: linear-gradient(to bottom, #cc0000, #880000);
          border-radius: 0 0 4px 4px;
          animation: drip-fall 4s ease-in-out infinite alternate;
          opacity: 0.7;
        }

        @keyframes drip-fall {
          from { transform: scaleY(0.3); opacity: 0.4; }
          to   { transform: scaleY(1);   opacity: 0.8; }
        }

        /* HERO CONTENT */
        .terror-hero-content {
          position: relative;
          z-index: 10;
          padding: 60px 48px 80px;
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

        .terror-skull {
          animation: pulse-skull 1.5s ease-in-out infinite alternate;
        }

        @keyframes pulse-skull {
          from { transform: scale(1);    opacity: 0.7; }
          to   { transform: scale(1.25); opacity: 1;   }
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
        }

        .terror-title-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-style: italic;
          color: #ef4444;
          margin-top: 8px;
        }

        .terror-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 20px;
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
        }

        .terror-movies-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(239,68,68,0.25);
        }

        .terror-title-accent { color: #ef4444; }

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

        @media (max-width: 768px) {
          .terror-hero-content { padding: 40px 20px 60px; }
          .terror-movies-section { padding: 48px 20px 60px; }
          .page-nav-footer { padding: 0 20px 60px; }
          .terror-stats-bar { gap: 20px; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
