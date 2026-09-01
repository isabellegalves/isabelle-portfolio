// Gerado a partir de ~/Desktop/desenhos. As salas sao as pastas dela.
// Titulos e tecnicas confirmados por ela; falta o ano de cada peca.
export const ROOMS = [
  {
    "name": "Ink on paper",
    "line": "Three hearts and a Medusa. The line does all the work.",
    "items": [
      {
        "src": "/images/art/anatomical-heart.webp",
        "title": "Anatomical Heart",
        "medium": "Ink on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/medusa.webp",
        "title": "Medusa",
        "medium": "Ink and color on paper",
        "w": 830,
        "h": 1100
      },
      {
        "src": "/images/art/heart-curled.webp",
        "title": "Heart, Curled",
        "medium": "Ink on paper",
        "w": 1100,
        "h": 1100
      },
      {
        "src": "/images/art/heart-made-of-arms.webp",
        "title": "Heart, Made of Arms",
        "medium": "Ink on paper",
        "w": 733,
        "h": 1100
      }
    ]
  },
  {
    "name": "Paint and pencil",
    "line": "Watercolor and graphite. Cats, a fox, and the people holding them.",
    "items": [
      {
        "src": "/images/art/girl-and-cat.webp",
        "title": "Girl and Cat",
        "medium": "Watercolor on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/fabricio-my-orange-cat.webp",
        "title": "Fabrício, My Orange Cat",
        "medium": "Watercolor on paper",
        "w": 886,
        "h": 1100
      },
      {
        "src": "/images/art/fox.webp",
        "title": "Fox",
        "medium": "Watercolor on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/study-girl-and-cat.webp",
        "title": "Study, Girl and Cat",
        "medium": "Pencil on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/cat-studies.webp",
        "title": "Cat Studies",
        "medium": "Pencil on paper",
        "w": 830,
        "h": 1100
      }
    ]
  },
  {
    "name": "Digital",
    "line": "Flat color and line, all of it drawn in Procreate with an Apple Pencil.",
    "items": [
      {
        "src": "/images/art/akai-ito-japanese-legend.webp",
        "title": "Akai Ito (Japanese legend)",
        "medium": "Procreate on iPad",
        "w": 780,
        "h": 1100
      },
      {
        "src": "/images/art/me-in-my-twenties.webp",
        "title": "Me in My Twenties",
        "medium": "Procreate on iPad",
        "w": 863,
        "h": 1100
      },
      {
        "src": "/images/art/red-hair.webp",
        "title": "Red Hair",
        "medium": "Procreate on iPad",
        "w": 1009,
        "h": 1100
      },
      {
        "src": "/images/art/me-coquinho-and-pepito.webp",
        "title": "Me, Coquinho and Pepito",
        "medium": "Procreate on iPad",
        "w": 640,
        "h": 640
      },
      {
        "src": "/images/art/fabricio.webp",
        "title": "Fabrício",
        "medium": "Procreate on iPad",
        "w": 984,
        "h": 1054
      }
    ]
  }
]

export const PIECES = ROOMS.flatMap(r => r.items)
