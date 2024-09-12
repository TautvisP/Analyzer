import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import TenderFilter from './components/TenderFilter';
import DataVisualization from './components/DataVisualization';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  const [tenders, setTenders] = useState([]);
  const [purchaseType, setPurchaseType] = useState('');
  const [announcementType, setAnnouncementType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const sortTendersByDate = (tenderList) => {
    return tenderList.sort((a, b) => {
      const dateComparison = new Date(b.publication_date) - new Date(a.publication_date);
      if (dateComparison === 0) {
        return b.id - a.id;
      }
      return dateComparison;
    });
  };

  const fetchTenders = useCallback(() => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/tenders/', {
      params: {
        purchase_type: purchaseType,
        announcement_type: announcementType,
        date_from: dateFrom,
        date_to: dateTo
      }
    })
      .then(response => {
        const sortedTenders = sortTendersByDate(response.data);
        setTenders(sortedTenders);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the tenders!', error);
        setLoading(false);
      });
  }, [purchaseType, announcementType, dateFrom, dateTo]);

  useEffect(() => {
    fetchTenders();
  }, [fetchTenders]);

  const handleRefresh = () => {
    setRefreshing(true);
    window.scrollTo(0, 0);
    axios.post('http://127.0.0.1:8000/api/refresh-tenders/')
      .then(response => {
        if (response.data.status === 'success') {
          fetchTenders();
        }
      })
      .finally(() => setRefreshing(false));
  };

  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleClearFilters = () => {
    setPurchaseType('');
    setAnnouncementType('');
    setDateFrom('');
    setDateTo('');
  };

  return (
    <AuthProvider>
      <Router>
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <h1 className="title" style={{ margin: '0 auto' }}>Duomenų gavybos, apdorojimo ir vizualizavimo sistemos prototipas</h1>
            <div>
              <Logout />
            </div>
          </div>
        </header>

        {loading && !refreshing && <div className="loading-bar"></div>}

        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/tenders"
              element={
                <PrivateRoute
                  element={
                    <div>
                      <h1>Filtravimas</h1>
                      <TenderFilter
                        purchaseType={purchaseType}
                        announcementType={announcementType}
                        dateFrom={dateFrom}
                        dateTo={dateTo}
                        onPurchaseTypeChange={setPurchaseType}
                        onAnnouncementTypeChange={setAnnouncementType}
                        onDateFromChange={setDateFrom}
                        onDateToChange={setDateTo}
                      />
                      <table className="actions-table">
                        <tbody>
                          <tr>
                            <td className="button-cell">
                              <button className="clear-filters-button" onClick={handleClearFilters}>Išvalyti Filtrus</button>
                            </td>
                            <td className="button-cell">
                              <button className="refresh-button" onClick={handleRefresh}>Atnaujinti Duomenis</button>
                            </td>
                            <td className="button-cell">
                              <button className="scroll-to-bottom-button" onClick={handleScrollToBottom}>Duomenų Vizualizacija</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <h1>Viešieji Pirkimai</h1>
                      {refreshing && <div className="loading-bar-refresh"></div>}
                      {loading && !refreshing && <div className="spinner"></div>}
                      {loading && <p>Kraunamas pirkimų sąrašas, prašome palaukti...</p>}
                      {!loading && tenders.length === 0 ? (
                        <p className="no-tenders-message">Su pasirinktais filtrais pirkimų nerasta</p>
                      ) : (
                        <table>
                          <thead>
                            <tr>
                              <th>Skelbimo Pavadinimas</th>
                              <th>Vykdytojas</th>
                              <th>Paskelbimo Data</th>
                              <th>Terminas</th>
                              <th>BVPŽ Kodas</th>
                              <th>Pirkimo Rūšis</th>
                              <th>Skelbimo Tipas</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tenders.map(tender => (
                              <tr key={tender.id}>
                                <td>{tender.title}</td>
                                <td><a href={tender.bidder_link} target="_blank" rel="noopener noreferrer">{tender.bidder_name}</a></td>
                                <td>{tender.publication_date}</td>
                                <td>{tender.submission_deadline}</td>
                                <td>{tender.cpv_code}</td>
                                <td>{tender.announcement_type}</td>
                                <td>{tender.purchase_type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      <div className="Charts">
                        <h1>Duomenų Vizualizacija</h1>
                        <DataVisualization />
                      </div>
                    </div>
                  }
                />
              }
            />
          </Routes>
          <div className="bottom-bar">
            Užsakovas UAB "Analyzeris 007"
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
