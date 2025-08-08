import express from 'express';
import Response from '../models/Response.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const r = new Response(req.body);
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/form/:formId', async (req, res) => {
  const responses = await Response.find({ formId: req.params.formId }).sort({ createdAt: -1 });
  res.json(responses);
});

export default router;
