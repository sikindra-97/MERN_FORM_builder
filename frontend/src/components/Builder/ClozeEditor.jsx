import React, { useState } from 'react'

export default function ClozeEditor({ onAdd }){
  const [text, setText] = useState('The brown fox jumps over the fence')
  const [blanks, setBlanks] = useState([])

  const makeBlank = () => {
    const tokens = text.split(' ')
    const idx = prompt('Enter word index (0-based) to blank, e.g., 1 for second word')
    const i = parseInt(idx)
    if(Number.isNaN(i) || i<0 || i>=tokens.length) return alert('Invalid')
    const word = tokens[i]
    tokens[i] = '____'
    setText(tokens.join(' '))
    setBlanks(prev=>[...prev, word])
  }

  const save = ()=>{ onAdd({ type: 'cloze', text, blanks }); setText(''); setBlanks([]) }

  return (
    <div>
      <h3 className="font-semibold mb-2">Cloze Editor</h3>
      <textarea className="border w-full p-2" rows={4} value={text} onChange={e=>setText(e.target.value)} />
      <div className="mt-2">
        <button onClick={makeBlank} className="px-3 py-1 border rounded mr-2">Underline (make blank)</button>
        <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Add Question</button>
      </div>
      <div className="mt-2 text-sm">Blanks: {blanks.join(', ')}</div>
    </div>
  )
}
