const conn = require('../connection');

module.exports = async (email, password) => {
  const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
  return new Promise((resolve, reject) => {
    conn.query(query, (err, results) => {
      if (err) return reject(err);
      return resolve(results[0]);
    });
  });
};
