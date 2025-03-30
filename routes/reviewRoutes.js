const express = require('express');
const { createReview, getReviewsByProfessor } = require('../models/Review');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
  const { professorId, nota, comentario } = req.body;
  const alunoId = req.user.id;
  try {
    const review = await createReview(alunoId, professorId, nota, comentario);
    res.status(201).json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
});

router.get('/:professorId', async (req, res) => {
  const { professorId } = req.params;
  try {
    const reviews = await getReviewsByProfessor(professorId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar avaliações' });
  }
});

module.exports = router;