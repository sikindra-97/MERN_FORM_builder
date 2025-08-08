import mongoose from 'mongoose';

const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // categorize | cloze | comprehension
  categories: [String],
  items: [
    {
      id: String,
      text: String,
      correctCategory: String
    }
  ],
  text: String,
  blanks: [String],
  paragraph: String,
  mcqs: [mcqSchema]
});

const formSchema = new mongoose.Schema({
  title: String,
  headerImage: String,
  questions: [questionSchema]
}, { timestamps: true });

export default mongoose.model('Form', formSchema);
