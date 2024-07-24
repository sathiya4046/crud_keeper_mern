import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Footer';
import Input from './Input';
import Nav from './Nav';
import Update from './Update';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Input/>}/>
        <Route path='/edit/:id' element={<Update/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
