import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MovieCard from "@/components/MovieCard";

export const metadata: Metadata = {
  title: "🌹 Romance | CineMax — El amor siempre encuentra un camino",
  description:
    "Las historias de amor más emotivas y románticas del año. Déjate llevar por el amor en todas sus formas.",
  keywords: "romance, amor, películas románticas, CineMax",
};

const movies = [
  {
    id: 1,
    title: "Bajo el Mismo Cielo",
    description:
      "Dos almas perdidas se encuentran en las calles de París. Sin hablar el mismo idioma, descubren que el amor no necesita palabras para ser real.",
    rating: 8.7,
    duration: "2h 10min",
    year: 2025,
    director: "Isabelle Fontaine",
    cast: ["Camila Herrera", "Antoine Dupont", "Marie Leclerc"],
    badge: "FAVORITA",
  },
  {
    id: 2,
    title: "Cartas desde el Mañana",
    description:
      "Él escribe cartas del pasado; ella las recibe en el futuro. Un amor imposible que trasciende el tiempo y desafía las leyes del universo.",
    rating: 9.1,
    duration: "2h 25min",
    year: 2025,
    director: "Miguel Ángel Roca",
    cast: ["Lucía Fernández", "Andrés Villalobos", "Rosa Núñez"],
    badge: "ESTRENO",
  },
  {
    id: 3,
    title: "El Sabor del Olvido",
    description:
      "Un chef de renombre pierde la memoria en un accidente. La mujer que lo cuida resulta ser el gran amor de su vida, pero él no la recuerda.",
    rating: 8.3,
    duration: "1h 55min",
    year: 2024,
    director: "Laura Medina",
    cast: ["Pilar Santana", "Gabriel Torres", "Renata Quispe"],
  },
  {
    id: 4,
    title: "Verano Sin Fin",
    description:
      "Un verano en la costa mediterránea. Dos jóvenes de mundos opuestos descubren que el amor puede cambiar el rumbo de sus destinos.",
    rating: 7.8,
    duration: "1h 42min",
    year: 2024,
    director: "Valentina Ricci",
    cast: ["Sara Blanco", "Mateo Guerrero", "Dolores Aguilar"],
  },
];

export default function RomancePage() {
  return (
    <div className="romance-page">
      {/* ── HERO ── */}
      <section className="romance-hero">
        <div className="romance-hero-image-wrap">
          <Image
            src="/romance.png"
            alt="Romance"
            fill
            priority
            className="romance-hero-img"
            sizes="100vw"
          />
          <div className="romance-hero-vignette" />
        </div>

        {/* Rose petals */}
        <div className="romance-petals">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${5 + i * 10}%`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: `${5 + (i % 3) * 2}s`,
                fontSize: `${0.8 + (i % 3) * 0.4}rem`,
              }}
            />
          ))}
        </div>

        <div className="romance-hero-content">
          <div className="romance-eyebrow">
            <span>🌹</span>
            <span>Sección de Romance</span>
            <span>💕</span>
          </div>
          <h1 className="romance-title">
            <span className="romance-title-main">ROMANCE</span>
            <span className="romance-title-sub">
              El amor siempre encuentra un camino
            </span>
          </h1>
          <p className="romance-desc">
            Historias que hacen latir el corazón más fuerte. Déjate llevar
            por el amor en todas sus formas, desde el flechazo hasta el amor
            eterno.
          </p>
          <div className="romance-hearts">
            {["💖", "💗", "💓", "💞", "💕"].map((h, i) => (
              <span
                key={i}
                className="floating-heart"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        <div className="romance-fog" />
      </section>

      {/* ── QUOTE BANNER ── */}
      <div className="romance-quote-banner">
        <blockquote className="romance-quote">
          &ldquo;El amor no es mirar el uno al otro; es mirar juntos en la misma dirección.&rdquo;
        </blockquote>
        <cite className="romance-cite">— Antoine de Saint-Exupéry</cite>
      </div>

      {/* ── STATS BAR ── */}
      <div className="romance-stats-bar">
        <div className="romance-stat">
          <span className="romance-stat-num">4</span>
          <span className="romance-stat-lbl">Películas</span>
        </div>
        <div className="romance-stat-sep" />
        <div className="romance-stat">
          <span className="romance-stat-num">8.5</span>
          <span className="romance-stat-lbl">Rating prom.</span>
        </div>
        <div className="romance-stat-sep" />
        <div className="romance-stat">
          <span className="romance-stat-num">2024–25</span>
          <span className="romance-stat-lbl">Temporada</span>
        </div>
        <div className="romance-stat-sep" />
        <div className="romance-stat">
          <span className="romance-stat-num">+13</span>
          <span className="romance-stat-lbl">Clasificación</span>
        </div>
      </div>

      {/* ── MOVIES ── */}
      <section className="romance-movies-section">
        <h2 className="romance-movies-title">
          <span>🌹 EN CARTELERA</span>
        </h2>
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} accentColor="#ec4899" />
          ))}
        </div>
      </section>

      {/* ── BACK NAV ── */}
      <div className="page-nav-footer romance-nav-footer">
        <Link href="/" className="back-btn">← Volver a la cartelera</Link>
        <div className="page-nav-other">
          <Link href="/terror" className="page-nav-link terror-link">💀 Terror</Link>
          <Link href="/comedia" className="page-nav-link comedia-link-r">🎭 Comedia</Link>
        </div>
      </div>

      <style>{`
        .romance-page {
          background: #080410;
          min-height: 100vh;
        }

        /* HERO */
        .romance-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .romance-hero-image-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .romance-hero-img {
          object-fit: cover;
          object-position: center;
          filter: saturate(0.8) brightness(0.5);
        }

        .romance-hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(8,4,16,0.5) 0%,
            rgba(100,0,60,0.2) 40%,
            rgba(8,4,16,0.9) 70%,
            #080410 100%
          );
        }

        /* PETALS */
        .romance-petals {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
        }

        .petal {
          position: absolute;
          top: -20px;
          animation: petal-fall linear infinite;
        }

        .petal::before {
          content: '🌸';
          opacity: 0.5;
        }

        @keyframes petal-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0.6; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0;   }
        }

        /* HERO CONTENT */
        .romance-hero-content {
          position: relative;
          z-index: 10;
          padding: 60px 48px 80px;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
        }

        .romance-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #ec4899;
          margin-bottom: 20px;
        }

        .romance-title {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .romance-title-main {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(5rem, 14vw, 11rem);
          line-height: 0.85;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, #ffffff 0%, #ff69b4 50%, #9b1b6a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(236,72,153,0.4));
        }

        .romance-title-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: #f472b6;
          margin-top: 8px;
        }

        .romance-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 24px;
        }

        .romance-hearts {
          display: flex;
          gap: 12px;
        }

        .floating-heart {
          font-size: 1.5rem;
          animation: heart-float 3s ease-in-out infinite alternate;
          display: inline-block;
        }

        @keyframes heart-float {
          from { transform: translateY(0px) scale(1);    opacity: 0.7; }
          to   { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }

        /* FOG */
        .romance-fog {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to top, #080410, transparent);
          z-index: 4;
          pointer-events: none;
        }

        /* QUOTE */
        .romance-quote-banner {
          text-align: center;
          padding: 36px 32px;
          background: linear-gradient(135deg, rgba(236,72,153,0.06) 0%, transparent 100%);
          border-top: 1px solid rgba(236,72,153,0.12);
          border-bottom: 1px solid rgba(236,72,153,0.12);
        }

        .romance-quote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          color: rgba(255,255,255,0.8);
          max-width: 700px;
          margin: 0 auto 8px;
        }

        .romance-cite {
          font-size: 0.8rem;
          color: #ec4899;
          letter-spacing: 0.1em;
        }

        /* STATS BAR */
        .romance-stats-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 28px 32px;
          background: rgba(236,72,153,0.05);
          border-bottom: 1px solid rgba(236,72,153,0.1);
        }

        .romance-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .romance-stat-num {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          color: #ec4899;
          line-height: 1;
        }

        .romance-stat-lbl {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .romance-stat-sep {
          width: 1px;
          height: 40px;
          background: rgba(236,72,153,0.2);
        }

        /* MOVIES */
        .romance-movies-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 64px 48px 80px;
        }

        .romance-movies-title {
          margin-bottom: 40px;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
          color: #ec4899;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .romance-movies-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(236,72,153,0.2);
        }

        /* BOTTOM NAV */
        .romance-nav-footer {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 48px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .terror-link {
          color: #ef4444;
          border: 1px solid rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.06);
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .terror-link:hover { background: rgba(239,68,68,0.15); }

        .comedia-link-r {
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,0.3);
          background: rgba(245,158,11,0.06);
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .comedia-link-r:hover { background: rgba(245,158,11,0.15); }

        @media (max-width: 768px) {
          .romance-hero-content { padding: 40px 20px 60px; }
          .romance-movies-section { padding: 48px 20px 60px; }
          .romance-nav-footer { padding: 0 20px 60px; }
          .romance-stats-bar { gap: 20px; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
