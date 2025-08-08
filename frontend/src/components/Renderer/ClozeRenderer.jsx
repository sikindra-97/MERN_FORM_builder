import React, { useState } from 'react'

export default function ClozeRenderer({ question, onAnswer }){
  const { text = '', blanks = [] } = question
  const [answers, setAnswers] = useState(() => blanks.slice())

  function setBlank(i, val){
    const next = [...answers]; next[i] = val; setAnswers(next); onAnswer(next)
  }

  return (
    <div>
      <div className="font-semibold mb-2">Fill in the blanks</div>
      <div className="mb-2">{text}</div>
      <div className="space-y-2">
        {answers.map((b,i)=> (
          <div key={i} className="flex gap-2 items-center">
            <div>Blank {i+1}:</div>
            <input value={answers[i]} onChange={e=>setBlank(i,e.target.value)} className="border p-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
