import React, { useState } from 'react'
import CategorizeEditor from './CategorizeEditor'
import ClozeEditor from './ClozeEditor'
import ComprehensionEditor from './ComprehensionEditor'

export default function QuestionList({ onAdd }){
  const [type, setType] = useState('categorize')

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <select value={type} onChange={e=>setType(e.target.value)} className="border p-2">
          <option value="categorize">Categorize</option>
          <option value="cloze">Cloze</option>
          <option value="comprehension">Comprehension</option>
        </select>
      </div>

      <div>
        {type === 'categorize' && <CategorizeEditor onAdd={onAdd} />}
        {type === 'cloze' && <ClozeEditor onAdd={onAdd} />}
        {type === 'comprehension' && <ComprehensionEditor onAdd={onAdd} />}
      </div>
    </div>
  )
}
