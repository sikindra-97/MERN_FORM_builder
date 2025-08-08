import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function CategorizeEditor({ onAdd }){
  const [categories, setCategories] = useState(['Category 1', 'Category 2'])
  const [items, setItems] = useState([])
  const [itemText, setItemText] = useState('')

  function addItem(){
    if(!itemText) return
    setItems(prev => [...prev, { id: uuid(), text: itemText, correctCategory: categories[0] }])
    setItemText('')
  }

  function updateItemCategory(id, cat){
    setItems(prev => prev.map(it => it.id === id ? { ...it, correctCategory: cat } : it))
  }

  function addCategory(){
    setCategories(prev => [...prev, `Category ${prev.length+1}`])
  }

  function save(){
    onAdd({ type: 'categorize', categories, items })
    setCategories(['Category 1','Category 2'])
    setItems([])
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Categorize Editor</h3>
      <div className="mb-2">
        <button onClick={addCategory} className="px-2 py-1 border rounded">Add Category</button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {categories.map((c, idx) => (
          <div key={idx} className="p-2 border rounded">{c}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={itemText} onChange={e=>setItemText(e.target.value)} className="border p-2 flex-1" placeholder="Item text" />
        <button onClick={addItem} className="px-3 py-1 bg-green-600 text-white rounded">Add Item</button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map(it=> (
          <div key={it.id} className="flex gap-2 items-center">
            <div className="flex-1">{it.text}</div>
            <select value={it.correctCategory} onChange={e=>updateItemCategory(it.id,e.target.value)} className="border p-1">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Add Question</button>
      </div>
    </div>
  )
}
