import { useState } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './components/Home'
import Transactions from './components/Transaction'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
