import { Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import Register from './Register';
import Login from './Login';
import Notes from './Notes';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/notes' element={<Notes/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
