// Gerado a partir de ~/Desktop/desenhos. Ordem das salas, ordem das pecas,
// titulos e tecnicas sao escolha dela. Sem ano, tambem escolha dela.
// `video` e opcional: quando existe, e o timelapse do Procreate.
export const ROOMS = [
  {
    "name": "Digital",
    "line": "Flat color and line, all of it drawn in Procreate with an Apple Pencil.",
    "items": [
      {
        "src": "/images/art/gordo.webp",
        "title": "Us",
        "medium": "Procreate on iPad",
        "w": 1100,
        "h": 825,
        "video": "/videos/gordo.mp4"
      },
      {
        "src": "/images/art/fabricio.webp",
        "title": "Fabrício, my orange cat",
        "medium": "Procreate on iPad",
        "w": 984,
        "h": 1054
      },
      {
        "src": "/images/art/meandfabris.webp",
        "title": "Me and Fabrício",
        "medium": "Procreate on iPad",
        "w": 906,
        "h": 1100,
        "video": "/videos/meandfabris.mp4"
      },
      {
        "src": "/images/art/me-coquinho-and-pepito.webp",
        "title": "Me, Coquinho and Pepito",
        "medium": "Procreate on iPad",
        "w": 640,
        "h": 640
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
      }
    ]
  },
  {
    "name": "Watercolor",
    "line": "Cotton paper and a wet brush. Fabrício twice, and a fox.",
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
        "title": "Fabrício, again",
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
      }
    ]
  },
  {
    "name": "On paper",
    "line": "Ink, pencil and Posca. Three hearts, a Medusa, two studies and a red thread.",
    "items": [
      {
        "src": "/images/art/anatomical-heart.webp",
        "title": "Anatomical Heart",
        "medium": "Ink pen on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/heart-curled.webp",
        "title": "Heart, Curled",
        "medium": "Pencil on paper",
        "w": 1100,
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
      },
      {
        "src": "/images/art/medusa.webp",
        "title": "Medusa",
        "medium": "Colored pencil and Posca pen on paper",
        "w": 830,
        "h": 1100
      },
      {
        "src": "/images/art/heart-made-of-arms.webp",
        "title": "Heart",
        "medium": "Ink pen on paper",
        "w": 733,
        "h": 1100
      },
      {
        "src": "/images/art/akai-ito-japanese-legend.webp",
        "title": "Akai Ito (Japanese legend)",
        "medium": "Black ink pen and red pen on paper",
        "w": 829,
        "h": 1100
      }
    ]
  }
]

export const PIECES = ROOMS.flatMap(r => r.items)
