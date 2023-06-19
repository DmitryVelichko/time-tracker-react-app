import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [timeEntries, setTimeEntries] = useState([]);
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      hours,
      description,
      project,
      date: new Date().toLocaleString(),
    };
    setTimeEntries([...timeEntries, newEntry]);
    setHours('');
    setDescription('');
    setProject('');
  };

  return (
    <div className="App">
      <h1>Time Tracker</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Hours:
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Project:
            <select value={project} onChange={(e) => setProject(e.target.value)}>
              <option value="">Select Project</option>
              <option value="Project A">Project 1</option>
              <option value="Project B">Project 2</option>
              <option value="Project C">Project 3</option>
            </select>
          </label>
          <button type="submit">Add Entry</button>
        </form>
        <h2>Time Entries</h2>
        <table>
          <thead>
            <tr>
              <th>Hours</th>
              <th>Description</th>
              <th>Project</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.hours}</td>
                <td>{entry.description}</td>
                <td>{entry.project}</td>
                <td>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}

export default App;
