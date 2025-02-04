import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar.jsx'
import './CelebritysBirthday.css';

function getMonthName(monthNumber) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthNumber - 1]; 
  }
const CelebrityInfo = () => {
  const [inputValue, setInputValue] = useState(''); // Stores the text in the input field
  const [celebrity, setCelebrity] = useState(''); // Stores the name for the API request
  const [result, setresult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCelebrityInfo = async () => {
    if (!celebrity) {
      alert('Please enter a celebrity name');
      return;
    }

    const apiUrl = `https://api.api-ninjas.com/v1/celebrity?name=${celebrity}`;
    const headers = {
      'X-Api-Key': 'i9wMqbyqK+6Zbmdd3XfdXw==u9x7ukWukAlmAhZ0', // Replace with your actual API key
    };

    setLoading(true); // Start loading
    setError(null); // Reset error
    setresult(null); // Clear previous result

    try {
      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setresult(result); // Store the fetched result
    } catch (err) {
      setError(err.message); // Capture any errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSearch = () => {
    setCelebrity(inputValue); // Set the celebrity name for the API call
  };

  React.useEffect(() => {
    if (celebrity) {
      fetchCelebrityInfo(); // Trigger the API request when celebrity state changes
    }
  }, [celebrity]);

  return (
    <div className='totalContent'> 
        <Navbar />
    <div className='content'>
        <div className='inputarea'><h1>Celebrity Information</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update input value
        placeholder="Enter celebrity name"
      />
      <button onClick={handleSearch}>Search</button></div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {result && result.length > 0 ? (
        <div className='result'>
          {result.map((item, index) => (
            <div className='box' key={index}>
              <h3><strong>Name:</strong> {item.name}</h3>
              <h3><strong>Occupation:</strong> {item.occupation ? item.occupation[0] : 'N/A'}</h3>
              <h3><strong>Net Worth:</strong> {item.net_worth}</h3>
              <h3><strong>Birthday:</strong> {item.birthday.split('-')[2]} {getMonthName(item.birthday.split('-')[1])}</h3>
            </div>
          ))}
        </div>
      ) : (
        !loading && result && <p>No results found</p>
      )}
    </div>
    </div>
    
  );
};

export default CelebrityInfo;
