import React, { useState } from 'react'

export default function CategorizeRenderer({ question, onAnswer }){
  const { categories = [], items = [] } = question
  const [answers, setAnswers] = useState(() => items.map(it => ({ id: it.id, chosen: '' })))

  function setChoice(id, cat){
    const next = answers.map(a => a.id === id ? { ...a, chosen: cat } : a)
    setAnswers(next)
    onAnswer(next)
  }

  return (
    <div>
      <div className="mb-2 font-semibold">Categorize</div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="font-semibold">Items</div>
          <div className="space-y-2 mt-2">
            {items.map(it => (
              <div key={it.id} className="p-2 border rounded flex items-center justify-between">
                <div>{it.text}</div>
                <select value={(answers.find(a=>a.id===it.id)||{}).chosen || ''} onChange={e=>setChoice(it.id,e.target.value)} className="border p-1">
                  <option value="">Choose</option>
                  {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold">Categories</div>
          <div className="mt-2 space-y-2">
            {categories.map(c=> <div key={c} className="p-2 border rounded">{c}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
