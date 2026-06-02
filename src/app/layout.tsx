import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CineMax | Tu Experiencia de Cine Definitiva",
  description:
    "Descubre las mejores películas de terror, romance y comedia en CineMax. La cartelera más emocionante te espera.",
  keywords: "cine, películas, cartelera, terror, romance, comedia",
  openGraph: {
    title: "CineMax | Tu Experiencia de Cine Definitiva",
    description: "Las mejores películas del año en un solo lugar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <footer className="cinema-footer">
          <div className="footer-logo">⭐ CINEMAX ⭐</div>
          <p className="footer-text">
            © 2025 CineMax. La mejor experiencia cinematográfica.
          </p>
        </footer>
      </body>
    </html>
  );
}
