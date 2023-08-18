import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  
  Route,
  Routes,
  useParams
} from "react-router-dom";



const NewTable = ({board}) => {

    const [decisionMatrixData, setDecisionMatrixData] = useState([]);
    const [value, setValue] = useState([]);
    const [input, setInput] = useState("");
    const [item, setItem] = useState("");
    let params = useParams();

    
    const findFactorById = (factorId) => decisionMatrixData[0].factors.find(factor => factor.factorId === factorId);
    
    

    const ChangeFactorUp = (id, original, data) => {
      const newVal = original + 1;
      const factor = findFactorById(id);

      if (factor) {
        factor.weight = newVal;
        setDecisionMatrixData([...decisionMatrixData]); // Update the state
      }

      axios.post('https://localhost:7225/API/factor/update?newWeight=' + newVal + '&factorId=' + id);

    }

    const ChangeFactorDown = (id, original, data) => {
      const newVal = original - 1;
      const factor = findFactorById(id);

      if (factor) {
        factor.weight = newVal;
        setDecisionMatrixData([...decisionMatrixData]); // Update the state
      }

      axios.post('https://localhost:7225/API/factor/update?newWeight=' + newVal + '&factorId=' + id);

      calculateTotals(decisionMatrixData);

    }

    const changeHandler = (e) => {
      setInput(e.target.value)
    }

    const submitHandler = (e) => {
      e.preventDefault()
      setItem(input);
      axios.post('https://localhost:7225/API/item/new?itemTitle=' + input + '&BoardID=' + params.id);
    }


    useEffect(() => {
      console.log("Matrix changed:")
     console.log(decisionMatrixData)
     console.log("Params")
     console.log(params)
    }, [decisionMatrixData]);

    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://localhost:7225/API/board={id}?boardId=' + params.id);
          setDecisionMatrixData([response.data]);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [item]);


    useEffect(() => {

      // const newValue = { ...value }; // Create a copy of the current state
      // const newTotals = calculateTotals(newValue);

        console.log(value);

    }, [value]);
    useEffect(() => {
      console.log("tot")

        console.log(value);

    }, [value]);

    function handleChange(inputfield, e) {
      const factorId = e.target.attributes[2].nodeValue;
      const itemId = e.target.attributes[1].nodeValue;
      const weight = e.target.attributes[3].nodeValue;
      const inputValue = e.target.value;
    
      const newValue = { ...value }; // Create a copy of the current state
    
      if (!newValue[factorId]) {
        newValue[factorId] = {}; // Create a new object for the factor ID if it doesn't exist
      }
    
      newValue[factorId][itemId] = inputValue * weight; // Assign the new value to the corresponding factor and item IDs
    
      const newTotals = calculateTotals(newValue);
      // Update the "totals" object separately
      newValue.totals = { ...newTotals };
    
      setValue(newValue); // Update the state with the new value
    }

    function calculateTotals(values) {
      const totals = {};
      
      for (const factor in values) {
        if (factor !== "totals") {
          for (const item in values[factor]) {
            if (!totals[item]) {
              totals[item] = 0; // Initialize total for the item ID if it doesn't exist
            }
            totals[item] += values[factor][item]; // Accumulate the values for the item ID
          }
        }
      }
      
      return totals;
    }
  

  return (
    <div className='table'>
      {decisionMatrixData.map((board) => (
        <div key={board.board.board_Id}>
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
                  <>
                  <th key={factor.factorId}>
                  
                    <div>

                    <a href="#" onClick={ChangeFactorDown.bind(this, factor.factorId, factor.weight)}>
                      -

                      </a>

                    </div>
                    {factor.weight}<div>
                      <a href="#" onClick={ChangeFactorUp.bind(this, factor.factorId, factor.weight)}>
                      +

                      </a>
                      </div></th>
                    
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {board.items.map((item) => (
                <tr key={item.item_Id}>
                  <td>{item.title}</td>
                  {board.factors.map((factor) => (
                    <td key={factor.factorId}>
                      <input
                        type="text"
                        item={item.item_Id}
                        factor={factor.factorId}
                        weight={factor.weight}
                        onChange={handleChange.bind(this, factor.factorId)}
                      />
                    </td>
                  ))}  
                  <td key="score">{value.totals && value.totals[item.item_Id]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={submitHandler}>

          <input type="text" onChange={changeHandler} value={input}></input>
          <input type="submit" value="New item" />

          {/* <ReactSlider /> */}

          </form>
        </div>
      ))}
    </div>
    
  );
}

export default NewTable