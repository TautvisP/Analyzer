import React, { useState, useEffect, useCallback } from 'react'; 
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
    return tenderList.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));
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
    window.scrollTo(0, 0); // Scroll to top
    axios.post('http://127.0.0.1:8000/api/refresh-tenders/')
      .then(response => {
        if (response.data.status === 'success') {
          fetchTenders(); // Refresh the tender list after successful scraping
        }
      })
      .finally(() => setRefreshing(false));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login and Register Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Default Route - Redirects to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Route - Tenders List */}
          <Route
            path="/tenders"
            element={
              <PrivateRoute
                element={
                  <div className="App">
                    <Logout />
                    <h1>Filtravimas</h1>
                    <TenderFilter
                      onPurchaseTypeChange={setPurchaseType}
                      onAnnouncementTypeChange={setAnnouncementType}
                      onDateFromChange={setDateFrom}
                      onDateToChange={setDateTo}
                    />

                    <h1>Viešieji Pirkimai</h1>

                    {/* Show loading bar while refreshing */}
                    {refreshing && <div className="loading-bar"></div>}

                    {/* Show loading spinner while fetching */}
                    {loading && !refreshing && <div className="spinner"></div>}

                    {/* Show loading message */}
                    {loading && <p>Kraunamas pirkimų sąrašas, prašome palaukti...</p>}

                    {/* Check if the tenders list is empty */}
                    {!loading && tenders.length === 0 ? (
                      <p>Su pasirinktais filtrais pirkimų nerasta</p>
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
                    <div className="refresh-button-container">
                      <button className="refresh-button" onClick={handleRefresh}>Atnaujinti Duomenis</button>
                    </div>

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
      </Router>
    </AuthProvider>
  );
};

export default App;
