import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState(() => {
    const saveHistory = localStorage.getItem("history");
    return saveHistory ? JSON.parse(saveHistory) : [];
  });

  const handleClick = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));;
  })

  const calculateResult = () => {
    try {
      const calculatedResult = eval(input);
      setResult(calculatedResult);
      const historyEntry = `${input} = ${calculatedResult}`;
      setHistory([...history, historyEntry]);
    } catch (error) {
      setResult("Error");
    }
  };

  const deleteHistory = (index) => {
    setHistory(history.filter((_, i) => i != index));
  }

  return (
    <>





      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="output">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
      </div>



      <div className="history">
        <h2>Calculation History</h2>
        {history.length === 0 ? (
          <p>No calculations yet!</p>
        ) : (
          <ul>
            {history.slice().reverse().map((entry, index) => (
              <div key={index}>
                <li>
                  <p>{entry}</p>
                  <button onClick={() => deleteHistory(history.length - index - 1)} className="d-btn">Delete</button>
                </li>
              </div>

            ))}
          </ul>
        )}
      </div>


    </>
  );
};

export default App;
