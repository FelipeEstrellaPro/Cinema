import Image from "next/image";
import Link from "next/link";
import { categories } from "@/app/data/movies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineMax | Cartelera de Cine",
  description:
    "Explora la mejor cartelera de cine con terror, romance y comedia. CineMax te trae la experiencia cinematográfica definitiva.",
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg" />

        {/* Particles */}
        <div className="hero-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 37 + 7) % 100}%`,
                top: `${(i * 53 + 13) % 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i % 3)}s`,
                width: i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span>🎬</span>
            <span>Cartelera 2025</span>
          </div>

          <h1 className="hero-title">
            <span className="line-1">Tu Mundo</span>
            <span className="line-2">de Cine</span>
          </h1>

          <p className="hero-subtitle">
            Descubre las mejores películas del año. Terror que eriza la piel,
            romance que enamora y comedia que hace reír sin parar.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Películas</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Géneros</div>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <div className="stat-number">4K</div>
              <div className="stat-label">Calidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="cards-section">
        <div className="section-header">
          <h2 className="section-title">ELIGE TU GÉNERO</h2>
          <p className="section-subtitle">
            Tres mundos cinematográficos únicos te esperan
          </p>
        </div>

        <div className="cards-grid">
          {categories.map((cat, idx) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="category-card animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Image */}
              <div className="card-image-wrapper">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="card-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx === 0}
                />
                <div className="card-overlay" />
                <div
                  className="card-badge-top"
                  style={{ color: cat.accentColor }}
                >
                  <span>{cat.icon}</span>
                  <span style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}>
                    {cat.label.toUpperCase()}
                  </span>
                </div>
                <div className="card-movie-count">
                  {cat.movies.length} películas
                </div>
              </div>

              {/* Body */}
              <div className="card-body">
                <div
                  className="card-accent-line"
                  style={{
                    background: `linear-gradient(90deg, ${cat.accentColor}, transparent)`,
                  }}
                />
                <span className="card-icon">{cat.icon}</span>
                <h3 className="card-title">{cat.label}</h3>
                <p
                  className="card-tagline"
                  style={{ color: cat.accentColor }}
                >
                  {cat.tagline}
                </p>
                <p className="card-description">{cat.description}</p>

                <div className="card-footer">
                  <span
                    className="card-explore-btn"
                    style={{ color: cat.accentColor }}
                  >
                    Explorar
                    <span className="card-arrow">→</span>
                  </span>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                    ⭐ Ver todo
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
