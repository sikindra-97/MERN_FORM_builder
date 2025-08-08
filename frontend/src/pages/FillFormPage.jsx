import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CategorizeRenderer from '../components/Renderer/CategorizeRenderer'
import ClozeRenderer from '../components/Renderer/ClozeRenderer'
import ComprehensionRenderer from '../components/Renderer/ComprehensionRenderer'

const API = import.meta.env.VITE_API_BASE || 'https://mern-form-builder-px3r.onrender.com/'

export default function FillFormPage(){
  const [forms, setForms] = useState([])
  const [formId, setFormId] = useState('')
  const [form, setForm] = useState(null)
  const [answers, setAnswers] = useState({})
  useEffect(()=>{ axios.get(`${API}/forms`).then(r=>setForms(r.data)) }, [])
  useEffect(()=>{
    if(!formId) return setForm(null)
    axios.get(`${API}/forms/${formId}`).then(r=>setForm(r.data))
  }, [formId])
  const submit = async ()=>{
    const payload = { formId: form._id, answers }
    const res = await axios.post(`${API}/responses`, payload)
    alert('Response saved: ' + res.data._id)
  }
  const updateAnswer = (qIndex, data) => setAnswers(prev=>({ ...prev, [qIndex]: data }))
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 p-6 flex justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">Fill Form</h2>
        <select
          className="border border-transparent focus:border-blue-300 focus:ring-2 focus:ring-blue-300 outline-none p-3 rounded-lg w-full mb-6"
          value={formId}
          onChange={e=>setFormId(e.target.value)}
        >
          <option value="">Select a saved form (most recent)</option>
          {forms.map(f=> <option key={f._id} value={f._id}>{f.title} ({f._id?.slice(0,6)})</option>)}
        </select>
        {form && (
          <div className="space-y-5">
            <h3 className="font-bold text-xl text-white">{form.title}</h3>
            {form.questions.map((q, idx)=> (
              <div key={idx} className="p-5 bg-white/20 rounded-xl shadow-inner">
                {q.type === 'categorize' && <CategorizeRenderer question={q} onAnswer={data=>updateAnswer(idx,data)} />}
                {q.type === 'cloze' && <ClozeRenderer question={q} onAnswer={data=>updateAnswer(idx,data)} />}
                {q.type === 'comprehension' && <ComprehensionRenderer question={q} onAnswer={data=>updateAnswer(idx,data)} />}
              </div>
            ))}
            <div className="flex justify-center">
              <button
                onClick={submit}
                className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg hover:opacity-90 transition-all font-medium"
              >
                🚀 Submit Responses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
