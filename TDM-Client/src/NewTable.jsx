import React, { useEffect, useState } from 'react'
import axios from 'axios'


const NewTable = () => {

    const [decisionMatrixData, setDecisionMatrixData] = useState([]);
    const [value, setValue] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7225/API/board={id}?boardId=1');
          setDecisionMatrixData([response.data]);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);

    function handleChange(name, e){
      console.log(name);
      console.log(e);


      var change = {};
      change[name] = e.target.value;
      setValue(prev => [...prev, change]);

      console.log(value)

    }

  return (
    <div>
      {decisionMatrixData.map((board) => (
        <div key={board.board.boar_Id}>
          <h2>{board.board.title}</h2>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                {board.factors.map((factor) => (
                  <th key={factor.factorId}>{factor.factorName}</th>
                  
                ))}
                <th>Score</th>
              </tr>
              
            </thead>
            <thead>
              <tr>
                <th>Weight</th>
                {board.factors.map((factor) => (
                  <th key={factor.factorId}>{factor.weight}</th>
                  
                ))}
              </tr>
              
            </thead>
            <tbody>
              {board.items.map((item) => (
                <tr key={item.item_Id}>
                  <td>{item.title}</td>
                  {board.factors.map((factor) => (
                    <td key={factor.factorId}>
                      <input type="text" item={item.item_Id} factor={factor.factorId} onChange={handleChange.bind(this, factor.factorId)} />
                    </td>
                  ))}
                  <td key="score">
                      
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default NewTable