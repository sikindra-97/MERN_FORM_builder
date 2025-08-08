import React, { useState } from 'react'

export default function ComprehensionRenderer({ question, onAnswer }){
  const { paragraph = '', mcqs = [] } = question
  const [answers, setAnswers] = useState(() => mcqs.map(()=>''))

  function setAns(i, val){
    const next = [...answers]; next[i]=val; setAnswers(next); onAnswer(next)
  }

  return (
    <div>
      <div className="font-semibold mb-2">Comprehension</div>
      <div className="mb-3 p-2 border rounded">{paragraph}</div>
      <div className="space-y-3">
        {mcqs.map((m,i)=> (
          <div key={i}>
            <div className="mb-1">{m.question}</div>
            <div className="flex gap-2 flex-wrap">
              {m.options.map(o=> (
                <label key={o} className="inline-flex items-center gap-2">
                  <input type="radio" name={`mcq-${i}`} checked={answers[i]===o} onChange={()=>setAns(i,o)} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
