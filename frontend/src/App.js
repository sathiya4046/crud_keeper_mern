import { Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import { useState } from 'react';
import Notes from './Notes';

function App() {
  const [token, setToken] = useState(null)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login setToken = {setToken}/>}/>
        <Route path='/notes' element={<Notes token = {token}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
