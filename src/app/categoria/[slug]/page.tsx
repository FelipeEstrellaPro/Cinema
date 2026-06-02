import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/app/data/movies";
import MovieCard from "@/components/MovieCard";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "No encontrado" };
  return {
    title: `${cat.icon} ${cat.label} | CineMax`,
    description: cat.description,
    keywords: `${cat.label}, cine, películas, CineMax`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);

  if (!cat) notFound();

  return (
    <>
      {/* HERO */}
      <section className="category-hero">
        <Image
          src={cat.image}
          alt={cat.label}
          fill
          priority
          className="category-hero-image"
          sizes="100vw"
          style={{ objectPosition: "center top" }}
        />

        {/* Gradient overlay */}
        <div
          className="category-hero-gradient"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(8,8,16,0.4) 0%,
              ${cat.gradientFrom}cc 40%,
              ${cat.gradientTo} 100%
            )`,
          }}
        />

        <div className="category-hero-content">
          <Link href="/" className="back-btn">
            ← Volver a la cartelera
          </Link>

          <div
            className="category-hero-label animate-fade-in-up"
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${cat.accentColor} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {cat.label}
          </div>

          <div
            className="category-hero-tagline animate-fade-in-up"
            style={{
              color: cat.accentColor,
              animationDelay: "0.1s",
            }}
          >
            {cat.tagline}
          </div>

          <p
            className="category-hero-description animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {cat.description}
          </p>
        </div>
      </section>

      {/* MOVIES */}
      <section className="movies-section">
        <h2
          className="movies-section-title"
          style={{ color: cat.accentColor }}
        >
          {cat.icon} En Cartelera
        </h2>

        <div className="movies-grid">
          {cat.movies.map((movie, idx) => (
            <div
              key={movie.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <MovieCard movie={movie} accentColor={cat.accentColor} />
            </div>
          ))}
        </div>
      </section>

      {/* OTHER CATEGORIES */}
      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 48px 80px",
        }}
      >
        <h2
          className="movies-section-title"
          style={{ color: "var(--text-secondary)" }}
        >
          Otros Géneros
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {categories
            .filter((c) => c.slug !== cat.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/categoria/${other.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: other.accentColor,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "all 0.3s ease",
                }}
                className="other-cat-link"
              >
                <span style={{ fontSize: "1.4rem" }}>{other.icon}</span>
                {other.label}
                <span style={{ color: "var(--text-secondary)", fontSize: "0.8rem", marginLeft: "4px" }}>
                  →
                </span>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
