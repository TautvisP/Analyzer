import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TenderFilter() {
  const [tenders, setTenders] = useState([]);
  const [purchaseType, setPurchaseType] = useState('');
  const [announcementType, setAnnouncementType] = useState('');

  useEffect(() => {
    // Fetch tenders based on filters
    axios.get(`/api/tenders/`, {
      params: {
        purchase_type: purchaseType,
        announcement_type: announcementType
      }
    }).then(response => {
      setTenders(response.data);
    });
  }, [purchaseType, announcementType]);

  return (
    <div>
      <label>Purchase Type:</label>
      <select onChange={e => setPurchaseType(e.target.value)}>
        <option value="">All</option>
        <option value="Type1">Type 1</option>
        <option value="Type2">Type 2</option>
      </select>

      <label>Announcement Type:</label>
      <select onChange={e => setAnnouncementType(e.target.value)}>
        <option value="">All</option>
        <option value="TypeA">Type A</option>
        <option value="TypeB">Type B</option>
      </select>

      <h2>Tenders</h2>
      <ul>
        {tenders.map(tender => (
          <li key={tender.id}>{tender.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TenderFilter;
