import React, { useState, useEffect } from 'react';

function TenderFilter({
  onPurchaseTypeChange,
  onAnnouncementTypeChange,
  onDateFromChange,
  onDateToChange,
  purchaseType = '',
  announcementType = '',
  dateFrom = '',
  dateTo = ''
}) {
  const [localPurchaseType, setLocalPurchaseType] = useState(purchaseType);
  const [localAnnouncementType, setLocalAnnouncementType] = useState(announcementType);
  const [localDateFrom, setLocalDateFrom] = useState(dateFrom);
  const [localDateTo, setLocalDateTo] = useState(dateTo);

  useEffect(() => {
    setLocalPurchaseType(purchaseType);
    setLocalAnnouncementType(announcementType);
    setLocalDateFrom(dateFrom);
    setLocalDateTo(dateTo);
  }, [purchaseType, announcementType, dateFrom, dateTo]);

  return (
    <div className="tender-filter">
      <label>Pirkimo Rūšis:</label>
      <select
        value={localPurchaseType}
        onChange={e => {
          setLocalPurchaseType(e.target.value);
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
        value={localAnnouncementType}
        onChange={e => {
          setLocalAnnouncementType(e.target.value);
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
        value={localDateFrom}
        onChange={e => {
          setLocalDateFrom(e.target.value);
          onDateFromChange(e.target.value);
        }}
      />

      <label>Data Iki:</label>
      <input
        type="date"
        value={localDateTo}
        onChange={e => {
          setLocalDateTo(e.target.value);
          onDateToChange(e.target.value);
        }}
      />
    </div>
  );
}

export default TenderFilter;
