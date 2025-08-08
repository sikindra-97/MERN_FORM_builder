import express from 'express';
import Form from '../models/Form.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if(!form) return res.status(404).json({ error: 'Not found' });
    res.json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 }).limit(50);
  res.json(forms);
});

export default router;
