import type { Metadata } from "next";
import TerrorClient from "./TerrorClient";

export const metadata: Metadata = {
  title: "💀 Terror | CineMax — ¿Te atreves a mirar?",
  description:
    "Las películas de terror más aterradoras del año. Suspenso, horror y miedo en estado puro. Sólo para los más valientes.",
  keywords: "terror, horror, miedo, películas de terror, CineMax",
};

export default function TerrorPage() {
  return <TerrorClient />;
}
