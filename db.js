const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect()
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch((err) => console.log('Erro na conexão com o banco', err));

module.exports = client;