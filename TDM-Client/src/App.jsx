import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import NewTable from './NewTable'

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('https://localhost:7225/API/users/all')
    .then(res => setUsers(res.data))

  },[])

  return (
    <>
       <NewTable board={1} />
       <div>New item</div>
    </>
  )
}

export default App
