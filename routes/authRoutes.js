const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const userExists = await getUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ error: 'Email já registrado' });
  }
  const hashedPassword = await bcrypt.hash(senha, 10);
  const newUser = await createUser(nome, email, hashedPassword, tipo);
  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(201).json({ token, user: newUser });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await getUserByEmail(email);
  if (!user || !await bcrypt.compare(senha, user.senha)) {
    return res.status(400).json({ error: 'Email ou senha inválidos' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
});

module.exports = router;