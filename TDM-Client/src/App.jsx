import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import NewTable from './NewTable'

import {
  
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('https://localhost:7225/API/users/all')
    .then(res => setUsers(res.data))

  },[])

  return (
    <>

    <Routes>
      <Route path={`/:id`} element={

        <NewTable board={1} />

      }/>
      <Route path={`/`} element={
        
        <h1>Main</h1>
      }/>

       
    </Routes>
       
    
    </>
  )
}

export default App
