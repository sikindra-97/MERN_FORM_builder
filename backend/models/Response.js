import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: {}
}, { timestamps: true });

export default mongoose.model('Response', responseSchema);
