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
    useEffect(() => {
      
        console.log(value);
    }, [value]);


    function handleChange(inputfield, e){
      console.log(inputfield)
      console.log(e)
      const factorId = e.target.attributes[2].nodeValue
      const itemId = e.target.attributes[1].nodeValue
      const weight = e.target.attributes[3].nodeValue
      const inputValue = e.target.value;
      





      const newValue = { ...value }; // Create a copy of the current state

      if (!newValue[factorId]) {
        newValue[factorId] = {}; // Create a new object for the factor ID if it doesn't exist
      }
    
      newValue[factorId][itemId] = inputValue * weight; // Assign the new value to the corresponding factor and item IDs
    
      setValue(newValue); // Update the state with the new value
    
      

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
                      <input type="text" item={item.item_Id} factor={factor.factorId} weight={factor.weight} onChange={handleChange.bind(this, factor.factorId)} />
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