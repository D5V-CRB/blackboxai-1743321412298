// GSFC Campus Building Data
export const buildings = [
  {
    id: 1,
    name: 'Main Administration Building',
    code: 'MAB',
    latitude: 38.9922,
    longitude: -76.8526,
    description: 'Primary administrative offices and services',
    image: require('../assets/buildings/mab.jpg'),
    facilities: ['Admissions', 'Registrar', 'Financial Aid']
  },
  {
    id: 2,
    name: 'Science & Engineering Complex',
    code: 'SEC',
    latitude: 38.9915,
    longitude: -76.8518,
    description: 'State-of-the-art science labs and engineering facilities',
    image: require('../assets/buildings/sec.jpg'),
    facilities: ['Physics', 'Chemistry', 'Computer Science']
  },
  {
    id: 3,
    name: 'University Library',
    code: 'LIB',
    latitude: 38.9928,
    longitude: -76.8531,
    description: 'Main campus library with study spaces and research resources',
    image: require('../assets/buildings/lib.jpg'),
    facilities: ['Study Rooms', 'Research Help', 'Computer Lab']
  },
  {
    id: 4,
    name: 'Student Center',
    code: 'SC',
    latitude: 38.9918,
    longitude: -76.8535,
    description: 'Hub for student activities and dining',
    image: require('../assets/buildings/sc.jpg'),
    facilities: ['Dining Hall', 'Student Organizations', 'Game Room']
  }
];

// Initial map region centered on campus
export const initialRegion = {
  latitude: 38.9920,
  longitude: -76.8525,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};