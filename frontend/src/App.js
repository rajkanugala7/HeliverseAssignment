import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './Dashboard';

function App() {
  return (
      
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
      
    
  );
}

export default App;
