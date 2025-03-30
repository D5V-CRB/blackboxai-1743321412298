// GSFC University Campus Data - Nodes and Connections
export const campusNodes = [
  {
    id: "main_gate",
    name: "GSFC Main Gate", 
    coordinates: [21.1702, 72.8311], // Vadodara coordinates
    description: "Main entrance to GSFC University campus"
  },
  {
    id: "admin_block",
    name: "Administration Block",
    coordinates: [21.1705, 72.8313],
    description: "University administration offices"
  },
  {
    id: "library",
    name: "Central Library",
    coordinates: [21.1708, 72.8310],
    description: "Main library with 50,000+ books"
  },
  {
    id: "science_block",
    name: "Science & Technology Block",
    coordinates: [21.1710, 72.8308],
    description: "Engineering and computer science departments"
  },
  {
    id: "cafeteria",
    name: "Student Cafeteria",
    coordinates: [21.1703, 72.8305],
    description: "Main food court and hangout area"
  },
  {
    id: "sports_complex",
    name: "Sports Complex",
    coordinates: [21.1698, 72.8309],
    description: "Indoor and outdoor sports facilities"
  }
];

export const campusEdges = [
  {from: "main_gate", to: "admin_block", distance: 120},
  {from: "admin_block", to: "library", distance: 150},
  {from: "library", to: "science_block", distance: 100},
  {from: "science_block", to: "cafeteria", distance: 80},
  {from: "cafeteria", to: "sports_complex", distance: 200},
  {from: "sports_complex", to: "main_gate", distance: 180},
  {from: "admin_block", to: "cafeteria", distance: 250}
];