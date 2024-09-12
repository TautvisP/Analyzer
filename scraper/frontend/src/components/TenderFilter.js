import React, { useState } from 'react';

function TenderFilter({ onPurchaseTypeChange, onAnnouncementTypeChange, onDateFromChange, onDateToChange }) {
  const [purchaseType, setPurchaseType] = useState('');
  const [announcementType, setAnnouncementType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Function to handle the "Clear Filters" button
  const clearFilters = () => {
    setPurchaseType('');
    setAnnouncementType('');
    setDateFrom('');
    setDateTo('');
    onPurchaseTypeChange('');
    onAnnouncementTypeChange('');
    onDateFromChange('');
    onDateToChange('');
  };

  return (
    <div className="tender-filter">
      <label>Pirkimo Rūšis:</label>
      <select
        value={purchaseType}
        onChange={e => {
          setPurchaseType(e.target.value);
          onPurchaseTypeChange(e.target.value);
        }}
      >
        <option value="">Visi</option>
        <option value="Darbai">Darbai</option>
        <option value="Paslaugos">Paslaugos</option>
        <option value="Prekės">Prekės</option>
      </select>

      <label>Skelbimo Tipas:</label>
      <select
        value={announcementType}
        onChange={e => {
          setAnnouncementType(e.target.value);
          onAnnouncementTypeChange(e.target.value);
        }}
      >
        <option value="">Visi</option>
        <option value="Išankstinis informacinis pranešimas">Išankstinis informacinis pranešimas</option>
        <option value="Skelbimas apie pirkimą">Skelbimas apie pirkimą</option>
        <option value="Skelbimas apie sutarties skyrimą">Skelbimas apie sutarties skyrimą</option>
        <option value="Savanoriškas išankstinis skaidrumo skelbimas">Savanoriškas išankstinis skaidrumo skelbimas</option>
        <option value="Skelbimas pirkėjo profilyje">Skelbimas pirkėjo profilyje</option>
        <option value="Skelbimas apie pakeitimą">Skelbimas apie pakeitimą</option>
      </select>

      <label>Data Nuo:</label>
      <input
        type="date"
        value={dateFrom}
        onChange={e => {
          setDateFrom(e.target.value);
          onDateFromChange(e.target.value);
        }}
      />

      <label>Data Iki:</label>
      <input
        type="date"
        value={dateTo}
        onChange={e => {
          setDateTo(e.target.value);
          onDateToChange(e.target.value);
        }}
      />

      {/* Clear Filters Button */}
      <button className="clear-filters-button" onClick={clearFilters}>Išvalyti Filtrus</button>
    </div>
  );
}

export default TenderFilter;
