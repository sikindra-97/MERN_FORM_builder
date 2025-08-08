import React, { useState } from 'react'

export default function ComprehensionEditor({ onAdd }){
  const [paragraph, setParagraph] = useState('')
  const [mcqs, setMcqs] = useState([])
  const [qtext, setQtext] = useState('')
  const [opts, setOpts] = useState('')
  const [correct, setCorrect] = useState('')

  const addMcq = () =>{
    const options = opts.split('|').map(s=>s.trim()).filter(Boolean)
    setMcqs(prev=>[...prev, { question: qtext, options, correctAnswer: correct }])
    setQtext(''); setOpts(''); setCorrect('')
  }

  const save = () =>{ onAdd({ type: 'comprehension', paragraph, mcqs }); setParagraph(''); setMcqs([]) }

  return (
    <div>
      <h3 className="font-semibold mb-2">Comprehension Editor</h3>
      <textarea rows={4} className="border w-full p-2" value={paragraph} onChange={e=>setParagraph(e.target.value)} placeholder="Paragraph" />
      <div className="mt-3 p-2 border rounded">
        <input value={qtext} onChange={e=>setQtext(e.target.value)} placeholder="Question text" className="border p-1 w-full mb-1" />
        <input value={opts} onChange={e=>setOpts(e.target.value)} placeholder="Options separated by | e.g. A|B|C" className="border p-1 w-full mb-1" />
        <input value={correct} onChange={e=>setCorrect(e.target.value)} placeholder="Correct option text" className="border p-1 w-full mb-1" />
        <div className="flex gap-2">
          <button onClick={addMcq} className="px-3 py-1 bg-green-600 text-white rounded">Add MCQ</button>
        </div>
      </div>

      <div className="mt-2">
        {mcqs.map((m,i)=>(<div key={i} className="p-2 border rounded mb-1"><div className="font-semibold">{m.question}</div><div className="text-sm">Options: {m.options.join(', ')}</div><div className="text-sm">Answer: {m.correctAnswer}</div></div>))}
      </div>

      <div className="mt-2">
        <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Add Question</button>
      </div>
    </div>
  )
}
