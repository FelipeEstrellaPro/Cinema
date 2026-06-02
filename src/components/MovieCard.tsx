"use client";

import { useState } from "react";
import type { Movie } from "@/app/data/movies";

type MovieCardProps = {
  movie: Movie;
  accentColor: string;
};

export default function MovieCard({ movie, accentColor }: MovieCardProps) {
  const [ticketClicked, setTicketClicked] = useState(false);

  const handleTicket = () => {
    setTicketClicked(true);
    setTimeout(() => setTicketClicked(false), 2000);
  };

  return (
    <article className="movie-card">
      <div className="movie-card-header">
        {movie.badge && (
          <span
            className="movie-badge"
            style={{
              background: `${accentColor}22`,
              color: accentColor,
              border: `1px solid ${accentColor}55`,
            }}
          >
            {movie.badge}
          </span>
        )}
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">
            ⭐ {movie.rating.toFixed(1)}
          </span>
          <span className="movie-meta-sep" />
          <span>{movie.duration}</span>
          <span className="movie-meta-sep" />
          <span>{movie.year}</span>
        </div>
      </div>

      <div className="movie-body">
        <p className="movie-description">{movie.description}</p>

        <div className="movie-info">
          <div className="movie-info-row">
            <span className="movie-info-label">Director</span>
            <span className="movie-info-value">{movie.director}</span>
          </div>
          <div className="movie-info-row">
            <span className="movie-info-label">Reparto</span>
            <span className="movie-info-value">
              {movie.cast.join(", ")}
            </span>
          </div>
        </div>
      </div>

      <div className="movie-card-footer">
        <button
          className="ticket-btn"
          style={{
            background: ticketClicked
              ? `linear-gradient(135deg, #22c55e, #16a34a)`
              : `linear-gradient(135deg, ${accentColor}, ${accentColor}99)`,
            color: "#000",
          }}
          onClick={handleTicket}
        >
          {ticketClicked ? "✅ ¡Reservado!" : "🎟 Comprar Entrada"}
        </button>
      </div>
    </article>
  );
}
