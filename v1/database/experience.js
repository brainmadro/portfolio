const { db } = require("./utilsDatabase");

const DB = [
  { name: 'html', level: 90 },
  { name: 'css', level: 90 },
  { name: 'javascript', level: 90 },
  { name: 'nodejs', level: 70 },
  { name: 'react', level: 80 },
  /* { name: 'postgresql', level: 50 }, */
  { name: 'sass', level: 70 },
  /* { name: 'webpack', level: 50 }, */
]

const getAllProgrammingLanguages = () => {
  console.log(db.connection);
  return DB;
};

module.exports = { getAllProgrammingLanguages };