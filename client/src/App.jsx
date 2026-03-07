import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FindPeople from './pages/FindPeople/FindPeople';
import { useEffect } from 'react';
function App() {



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<FindPeople />} />
    </Routes>
    </BrowserRouter>


    </>
  )
}

export default App
