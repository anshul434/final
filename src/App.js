import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./hi.css"; // Import CSS file for styling

const App = () => {
  document.title = "2337705"; // Set website title to roll number

  const [jsonInput, setJsonInput] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dropdownOptions = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async () => {
    setError("");
    setApiResponse(null);
  
    try {
      const parsedJson = JSON.parse(jsonInput);
  
      console.log("Sending JSON:", parsedJson); // Debugging
  
      const response = await axios.post("http://localhost:5000/bfhl", parsedJson, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("API Response:", response.data); // Debugging
      setApiResponse(response.data);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError("Invalid JSON format or API error.");
    }
  };
  

  return (
    <div className="container">
      <h1>JSON Input</h1>
      <textarea
        rows="5"
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder="Enter valid JSON"
        className="input-box"
      />
      <button onClick={handleSubmit} className="submit-button">Submit</button>
      {error && <p className="error">{error}</p>}

      {apiResponse && (
        <>
          <Select
            options={dropdownOptions}
            isMulti
            onChange={setSelectedOptions}
            className="dropdown"
            placeholder="Select options to display"
          />
          <div className="response-box">
            {selectedOptions.map((option) => (
              <div key={option.value} className="response-item">
                <strong>{option.label}:</strong>
                <p>{JSON.stringify(apiResponse[option.value])}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;