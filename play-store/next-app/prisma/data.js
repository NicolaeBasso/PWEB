const { Prisma } = require('@prisma/client');

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: "4321",
    role: 1
  },
  {
    name: 'Jake',
    email: 'jake@gmail.com',
    password: "4321",
    role: 2
  },
  {
    name: 'Stranger',
    email: null,
    password: null,
    role: 3
  },
];

const roles = [
  {
    role: "publisher"
  },
  {
    role: "user"
  },
  {
    role: "none"
  },
];

const games = [
  {
    name: 'Battlefield 4',
    genre: 'FPS',
    description: "Battlefield 4 is a 2013 first-person shooter video game developed by DICE and published by Electronic Arts.",
    creator: "DICE"
  },
  {
    name: 'Baldur\'s Gate 3',
    genre: 'RPG',
    description: "Baldur's Gate III is an upcoming role-playing video game that is being developed and published by Larian Studios. It is the third main game in the Baldur's Gate series, itself based on the Dungeons & Dragons tabletop role-playing system.",
    creator: "Larian Studios"
  },
];

const apps = [
  {
    name: 'Google Lens',
    description: "Google Lens is an image recognition technology developed by Google, designed to bring up relevant information related to objects it identifies using visual analysis based on a neural network.",
    creator: "Google"
  },
  {
    name: 'Baldur\'s Gate 3',
    description: "4321",
    creator: "Larian Studios"
  },
];

module.exports = {
  users,
  roles,
  games,
  apps
};