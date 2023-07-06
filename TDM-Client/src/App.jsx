import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import Table from './Table'
import NewTable from './NewTable'

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('https://localhost:7225/API/users/all')
    .then(res => setUsers(res.data))

  },[])

  return (
    <>
      {/* {
        users.map((user, index) => (
          <p kewy={index}>{user.firstName}</p>

        ))
      } */}
      {/* <Table></Table>
       */}
       <NewTable />
    </>
  )
}

export default App
