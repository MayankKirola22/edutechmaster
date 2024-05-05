import { useEffect, useState } from 'react';
import './App.css';
import './Components/Global.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
function App() {
  const [user,setUser]=useState(null);
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("User")))
  },[])
  return (
    <div className="App">
      <Routes>
          {user===null?<Route path='' element={<Login setUser={setUser} />} />:<Route path='' element={<Dashboard user={user} setUser={setUser} />} />}
          <Route path='*' element={<Navigate to=''/>} />
      </Routes>
    </div>
  );
}

export default App;
