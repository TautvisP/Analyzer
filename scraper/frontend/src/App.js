import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tenders, setTenders] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tenders/')
      .then(response => {
        setTenders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tenders!', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Tenders</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Bidder Name</th>
            <th>Bidder Link</th>
            <th>Publication Date</th>
            <th>Submission Deadline</th>
            <th>CPV Code</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map(tender => (
            <tr key={tender.id}>
              <td>{tender.title}</td>
              <td>{tender.bidder_name}</td>
              <td><a href={tender.bidder_link} target="_blank" rel="noopener noreferrer">{tender.bidder_link}</a></td>
              <td>{tender.publication_date}</td>
              <td>{tender.submission_deadline}</td>
              <td>{tender.cpv_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
