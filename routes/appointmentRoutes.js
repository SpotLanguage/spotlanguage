const express = require('express');
const { createAppointment } = require('../models/Appointment');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/schedule', verifyToken, async (req, res) => {
  const { professorId, dataHora } = req.body;
  const alunoId = req.user.id;
  try {
    const appointment = await createAppointment(alunoId, professorId, dataHora);
    res.status(201).json({ appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao agendar aula' });
  }
});

module.exports = router;