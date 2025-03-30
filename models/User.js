const db = require('../db');

const createUser = async (nome, email, senha, tipo) => {
  const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, tipo';
  const values = [nome, email, senha, tipo];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1';
  const values = [email];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = { createUser, getUserByEmail };