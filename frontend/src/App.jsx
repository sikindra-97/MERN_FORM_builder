import React from 'react'
import BuilderPage from './pages/BuilderPage'
import FillFormPage from './pages/FillFormPage'

export default function App(){
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">MERN Form Builder</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="col-span-1 bg-white p-4 rounded shadow">
          <BuilderPage />
        </div>
        <div className="col-span-1 bg-white p-4 rounded shadow">
          <FillFormPage />
        </div>
      </div>
    </div>
  )
}
