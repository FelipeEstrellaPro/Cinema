import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import MovieCard from "@/components/MovieCard";

export const metadata: Metadata = {
  title: "🎭 Comedia | CineMax — La risa es el mejor remedio",
  description:
    "Las comedias más divertidas del año. Ríe hasta que te duela la barriga con las mejores películas cómicas.",
  keywords: "comedia, humor, películas divertidas, CineMax",
};

const movies = [
  {
    id: 1,
    title: "Mi Suegra es un Zombie",
    description:
      "Cuando la suegra más difícil del mundo regresa de entre los muertos, el yerno perfecto deberá mantener el secreto familiar más grande de la historia.",
    rating: 8.0,
    duration: "1h 45min",
    year: 2025,
    director: "Paco Jiménez",
    cast: ["Tomás Alvarado", "Consuelo Vargas", "Beatriz Ojeda"],
    badge: "ÉXITO",
  },
  {
    id: 2,
    title: "Operación Papá",
    description:
      "Cuatro hijos adultos conspiran para encontrarle pareja a su padre viudo. El plan sale completamente de control con resultados hilarantes.",
    rating: 7.5,
    duration: "1h 50min",
    year: 2025,
    director: "Sergio Portillo",
    cast: ["Emilio Salas", "Miriam Cortés", "Javier Lara"],
    badge: "ESTRENO",
  },
  {
    id: 3,
    title: "El Chef Desastroso",
    description:
      "Un famoso crítico gastronómico pierde el gusto y el olfato. Para salvar su carrera, deberá engañar a todos fingiendo que puede probar la comida.",
    rating: 8.6,
    duration: "2h 00min",
    year: 2024,
    director: "Claudia Mena",
    cast: ["Ricardo Paz", "Norma Estrada", "Hector Benítez"],
    badge: "MÁS VISTO",
  },
  {
    id: 4,
    title: "Vacaciones en Desastre",
    description:
      "Una familia numerosa planea las vacaciones perfectas. Cada cosa que puede salir mal, sale mal. Y sin embargo, resulta ser el mejor viaje de sus vidas.",
    rating: 7.9,
    duration: "1h 38min",
    year: 2024,
    director: "Ana Bermejo",
    cast: ["Pedro Rueda", "Carmen Salazar", "Elvira Montoya"],
  },
];

export default function ComediaPage() {
  return (
    <div className="comedia-page">
      {/* ── HERO ── */}
      <section className="comedia-hero">
        <div className="comedia-hero-image-wrap">
          <Image
            src="/comedia.png"
            alt="Comedia"
            fill
            priority
            className="comedia-hero-img"
            sizes="100vw"
          />
          <div className="comedia-hero-vignette" />
        </div>

        {/* Confetti */}
        <div className="comedia-confetti">
          {["🎉", "✨", "🎊", "⭐", "🌟", "💫", "🎈", "🎁", "🎯", "🎪"].map(
            (emoji, i) => (
              <span
                key={i}
                className="confetti-piece"
                style={{
                  left: `${5 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + (i % 4)}s`,
                  fontSize: `${1 + (i % 3) * 0.5}rem`,
                }}
              >
                {emoji}
              </span>
            )
          )}
        </div>

        <div className="comedia-hero-content">
          <div className="comedia-eyebrow">
            <span>🎭</span>
            <span>Sección de Comedia</span>
            <span>😂</span>
          </div>
          <h1 className="comedia-title">
            <span className="comedia-title-main">COMEDIA</span>
            <span className="comedia-title-sub">La risa es el mejor remedio</span>
          </h1>
          <p className="comedia-desc">
            Ríe hasta que te duela la barriga. Las mejores comedias del año te
            esperan con situaciones absurdas, personajes entrañables y giros
            inesperados.
          </p>
          <div className="comedia-emoji-row">
            {["😂", "🤣", "😆", "🤪", "😜"].map((e, i) => (
              <span
                key={i}
                className="comedia-emoji-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="comedia-fog" />
      </section>

      {/* ── MARQUEE BANNER ── */}
      <div className="comedia-marquee-wrap">
        <div className="comedia-marquee">
          {[...Array(3)].map((_, rep) => (
            <span key={rep} className="comedia-marquee-inner">
              {["🤣 RISAS GARANTIZADAS", "🎭 HUMOR DE CALIDAD", "😂 SIN PARAR DE REÍR", "🎉 EL MEJOR ENTRETENIMIENTO", "✨ DIVERSIÓN TOTAL"].map(
                (t, i) => (
                  <span key={i} className="marquee-item">
                    {t}
                    <span className="marquee-sep">·</span>
                  </span>
                )
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="comedia-stats-bar">
        <div className="comedia-stat">
          <span className="comedia-stat-num">4</span>
          <span className="comedia-stat-lbl">Películas</span>
        </div>
        <div className="comedia-stat-sep" />
        <div className="comedia-stat">
          <span className="comedia-stat-num">8.0</span>
          <span className="comedia-stat-lbl">Rating prom.</span>
        </div>
        <div className="comedia-stat-sep" />
        <div className="comedia-stat">
          <span className="comedia-stat-num">2024–25</span>
          <span className="comedia-stat-lbl">Temporada</span>
        </div>
        <div className="comedia-stat-sep" />
        <div className="comedia-stat">
          <span className="comedia-stat-num">+7</span>
          <span className="comedia-stat-lbl">Clasificación</span>
        </div>
      </div>

      {/* ── MOVIES ── */}
      <section className="comedia-movies-section">
        <h2 className="comedia-movies-title">🎭 EN CARTELERA</h2>
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} accentColor="#f59e0b" />
          ))}
        </div>
      </section>

      {/* ── BACK NAV ── */}
      <div className="comedia-nav-footer">
        <Link href="/" className="back-btn">← Volver a la cartelera</Link>
        <div className="page-nav-other">
          <Link href="/terror" className="terror-link-c">💀 Terror</Link>
          <Link href="/romance" className="romance-link-c">🌹 Romance</Link>
        </div>
      </div>

      <style>{`
        .comedia-page {
          background: #090800;
          min-height: 100vh;
        }

        /* HERO */
        .comedia-hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .comedia-hero-image-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .comedia-hero-img {
          object-fit: cover;
          object-position: center;
          filter: saturate(1.1) brightness(0.5);
        }

        .comedia-hero-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(9,8,0,0.4) 0%,
            rgba(80,50,0,0.2) 40%,
            rgba(9,8,0,0.9) 70%,
            #090800 100%
          );
        }

        /* CONFETTI */
        .comedia-confetti {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          top: -30px;
          animation: confetti-fall linear infinite;
        }

        @keyframes confetti-fall {
          0%   { transform: translateY(-30px) rotate(0deg)   scale(1);   opacity: 0.8; }
          100% { transform: translateY(100vh)  rotate(720deg) scale(0.5); opacity: 0;   }
        }

        /* HERO CONTENT */
        .comedia-hero-content {
          position: relative;
          z-index: 10;
          padding: 60px 48px 80px;
          max-width: 1300px;
          margin: 0 auto;
          width: 100%;
        }

        .comedia-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #f59e0b;
          margin-bottom: 20px;
        }

        .comedia-title {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .comedia-title-main {
          font-family: 'Bebas Neue', cursive;
          font-size: clamp(5rem, 14vw, 11rem);
          line-height: 0.85;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #b45309 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(251,191,36,0.4));
        }

        .comedia-title-sub {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: #fbbf24;
          margin-top: 8px;
        }

        .comedia-desc {
          font-size: 1rem;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          line-height: 1.75;
          margin-bottom: 24px;
        }

        .comedia-emoji-row {
          display: flex;
          gap: 16px;
        }

        .comedia-emoji-bounce {
          font-size: 2rem;
          display: inline-block;
          animation: emoji-bounce 0.6s ease-in-out infinite alternate;
        }

        @keyframes emoji-bounce {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-12px) rotate(5deg); }
        }

        /* FOG */
        .comedia-fog {
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to top, #090800, transparent);
          z-index: 4;
          pointer-events: none;
        }

        /* MARQUEE */
        .comedia-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(245,158,11,0.2);
          border-bottom: 1px solid rgba(245,158,11,0.2);
          background: rgba(245,158,11,0.05);
          padding: 14px 0;
          white-space: nowrap;
        }

        .comedia-marquee {
          display: inline-flex;
          animation: marquee-scroll 20s linear infinite;
        }

        .comedia-marquee-inner {
          display: inline-flex;
          gap: 0;
        }

        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }

        .marquee-item {
          font-family: 'Bebas Neue', cursive;
          font-size: 1rem;
          letter-spacing: 0.15em;
          color: #f59e0b;
          padding: 0 24px;
        }

        .marquee-sep {
          margin-left: 24px;
          opacity: 0.4;
        }

        /* STATS */
        .comedia-stats-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          padding: 28px 32px;
          background: rgba(245,158,11,0.05);
          border-bottom: 1px solid rgba(245,158,11,0.1);
        }

        .comedia-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .comedia-stat-num {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          color: #f59e0b;
          line-height: 1;
        }

        .comedia-stat-lbl {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }

        .comedia-stat-sep {
          width: 1px;
          height: 40px;
          background: rgba(245,158,11,0.2);
        }

        /* MOVIES */
        .comedia-movies-section {
          max-width: 1300px;
          margin: 0 auto;
          padding: 64px 48px 80px;
        }

        .comedia-movies-title {
          margin-bottom: 40px;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
          color: #f59e0b;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .comedia-movies-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(245,158,11,0.2);
        }

        /* BOTTOM NAV */
        .comedia-nav-footer {
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

        .terror-link-c {
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

        .terror-link-c:hover { background: rgba(239,68,68,0.15); }

        .romance-link-c {
          color: #ec4899;
          border: 1px solid rgba(236,72,153,0.3);
          background: rgba(236,72,153,0.06);
          padding: 10px 22px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .romance-link-c:hover { background: rgba(236,72,153,0.15); }

        @media (max-width: 768px) {
          .comedia-hero-content { padding: 40px 20px 60px; }
          .comedia-movies-section { padding: 48px 20px 60px; }
          .comedia-nav-footer { padding: 0 20px 60px; }
          .comedia-stats-bar { gap: 20px; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
