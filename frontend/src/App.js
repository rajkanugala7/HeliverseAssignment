import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PrincipalDashboard from './PrincipalDashboard';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import Login from './Login'; // Assuming you have a Login component

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/principal-dashboard' element={<PrincipalDashboard />} />
      <Route path='/teacher-dashboard' element={<TeacherDashboard />} />
      <Route path='/student-dashboard' element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
