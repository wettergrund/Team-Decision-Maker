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
import Nav from './Nav'

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(1)
  
  useEffect(() => {
    axios.get('https://localhost:7225/API/users/all')
    .then(res => setUsers(res.data))

  },[])

  useEffect(() => {

    console.log(users)
  },[users])

  return (
    <>
    {/* <Nav /> */}

    <Routes>
      <Route path={`/:id`} element={
        <>
        <h1>Decision matrix</h1>
        <div className="info">

        <p>
          Add considered options, then vote, (eg. 1-10) for each factor.
        </p>
        <p>
          <b>Weight
            </b> represent the importance of each factor, which will affect the overall <b>score</b>.
        </p>
        </div>
        <NewTable board={1} />
        </>

      }/>
      <Route path={`/`} element={
        
        <h1>Main


        </h1>
      }/>

       
    </Routes>
       
    
    </>
  )
}

export default App
