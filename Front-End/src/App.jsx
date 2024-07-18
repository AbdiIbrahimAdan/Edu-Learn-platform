import './App.css'
import Header from './Components/Header/Header';
import Home from './Page/Home/Home';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      {/* <Route path='/' element={<Ab/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/' element={<Home/>}/> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
