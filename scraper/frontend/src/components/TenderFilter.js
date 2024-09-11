import React from 'react';

function TenderFilter({ onPurchaseTypeChange, onAnnouncementTypeChange }) {
  return (
    <div>
      <label>Purchase Type:</label>
      <select onChange={e => onPurchaseTypeChange(e.target.value)} defaultValue="">
        <option value="">Visi</option>
        <option value="Darbai">Darbai</option>
        <option value="Paslaugos">Paslaugos</option>
        <option value="Prekės">Prekės</option>
      </select>

      <label>Announcement Type:</label>
      <select onChange={e => onAnnouncementTypeChange(e.target.value)} defaultValue="">
        <option value="">Visi</option>
        <option value="Išankstinis informacinis pranešimas">Išankstinis informacinis pranešimas</option>
        <option value="Skelbimas apie pirkimą">Skelbimas apie pirkimą</option>
        <option value="Skelbimas apie sutarties skyrimą">Skelbimas apie sutarties skyrimą</option>
        <option value="Savanoriškas išankstinis skaidrumo skelbimas">Savanoriškas išankstinis skaidrumo skelbimas</option>
        <option value="Skelbimas pirkėjo profilyje">Skelbimas pirkėjo profilyje</option>
        <option value="Skelbimas apie pakeitimą">Skelbimas apie pakeitimą</option>
      </select>
    </div>
  );
}

export default TenderFilter;
