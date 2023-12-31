import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';

function App() {
  const [timeEntries, setTimeEntries] = useState([]);
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [project, setProject] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const entriesFromLocalStorage = localStorage.getItem('timeEntries');
    if (entriesFromLocalStorage) {
      setTimeEntries(JSON.parse(entriesFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
    return () => {
      localStorage.removeItem('timeEntries');
    };
  }, [timeEntries]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };


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

  const handleDeleteEntry = (entry) => {
    setTimeEntries((prevEntries) =>
      prevEntries.filter((prevEntry) => prevEntry !== entry)
    );
  };


  return (
    <div className="App">
      <h1>Time Tracker</h1>
      {isLoggedIn ? (<>
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
            Desc.:
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
              <option value="Project A">Project A</option>
              <option value="Project B">Project B</option>
              <option value="Project C">Project C</option>
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
              <tr key={entry.id}>
                <td>{entry.hours}</td>
                <td>{entry.description}</td>
                <td>{entry.project}</td>
                <td>{entry.date}</td>
                <td><button className='delete-button' onClick={() => handleDeleteEntry(entry)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>) :
        <Login onLogin={handleLogin} />
      }
    </div>
  );
}

export default App;
