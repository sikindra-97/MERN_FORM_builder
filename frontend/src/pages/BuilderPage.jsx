import React, { useState } from 'react'
import axios from 'axios'
import QuestionList from '../components/Builder/QuestionList'

const API = import.meta.env.VITE_API_BASE || 'https://mern-form-builder-px3r.onrender.com/'

export default function BuilderPage() {
  const [title, setTitle] = useState('My Form')
  const [questions, setQuestions] = useState([])
  const addQuestion = q => setQuestions(prev => [...prev, q])

  const save = async () => {
    const payload = { title, questions }
    const res = await axios.post(`${API}/forms`, payload)
    alert('Saved: ' + res.data._id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex justify-center">
      <div
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl border border-white/20
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-pink-300"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Form Builder
        </h2>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Enter Form Title"
          className="border border-transparent focus:border-pink-300 focus:ring-2 focus:ring-pink-300 outline-none p-3 rounded-lg w-full mb-5"
        />

        <QuestionList onAdd={addQuestion} />

        <div className="mt-6 flex justify-center">
          <button
            onClick={save}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:opacity-90 transition-all font-medium"
          >
            💾 Save Form
          </button>
        </div>
      </div>
    </div>
  )
}
