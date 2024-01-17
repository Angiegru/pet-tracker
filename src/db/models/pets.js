const knex = require('./knex');

class Pets {
  // This is just an example query, obviously you need to change it, but it shows you how to use knex.raw and dynamic values
//   static async create(data) {
//     try {
//       const query = `INSERT INTO examples (data) values (?) returning *`;
//       const { rows: [newToDo] } = await knex.raw(query, [data]);
//       return newToDo;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   }
// }
  // This is just an example query, obviously you need to change it, but it shows you how to use knex.raw and dynamic values
  static async getAllPets() {
    try {
      const query = `SELECT * FROM pets`;
      const result = await knex.raw(query);
      console.log(result);
      return result.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Pets;