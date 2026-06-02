export type Movie = {
  id: number;
  title: string;
  description: string;
  rating: number;
  duration: string;
  year: number;
  director: string;
  cast: string[];
  badge?: string;
};

export type Category = {
  slug: string;
  label: string;
  tagline: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  icon: string;
  image: string;
  description: string;
  movies: Movie[];
};

export const categories: Category[] = [
  {
    slug: "terror",
    label: "Terror",
    tagline: "¿Te atreves a mirar?",
    color: "#ef4444",
    gradientFrom: "#1a0000",
    gradientTo: "#3d0000",
    accentColor: "#ff2222",
    icon: "💀",
    image: "/terror.png",
    description:
      "Sumérgete en las profundidades del miedo. Películas que te harán dormir con la luz encendida y que retarán tus límites del terror.",
    movies: [
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
    ],
  },
  {
    slug: "romance",
    label: "Romance",
    tagline: "El amor siempre encuentra un camino",
    color: "#ec4899",
    gradientFrom: "#1a0010",
    gradientTo: "#3d0025",
    accentColor: "#ff69b4",
    icon: "🌹",
    image: "/romance.png",
    description:
      "Historias que hacen latir el corazón más fuerte. Déjate llevar por el amor en todas sus formas, desde el flechazo hasta el amor eterno.",
    movies: [
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
    ],
  },
  {
    slug: "comedia",
    label: "Comedia",
    tagline: "La risa es el mejor remedio",
    color: "#f59e0b",
    gradientFrom: "#1a1200",
    gradientTo: "#3d2a00",
    accentColor: "#fbbf24",
    icon: "🎭",
    image: "/comedia.png",
    description:
      "Ríe hasta que te duela la barriga. Las mejores comedias del año te esperan con situaciones absurdas, personajes entrañables y giros inesperados.",
    movies: [
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
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
