import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './DataVisualization.css'; // Import the CSS file

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function DataVisualization() {
  const [data, setData] = useState({
    purchaseTypeData: {
      labels: [],
      datasets: []
    },
    announcementTypeData: {
      labels: [],
      datasets: []
    }
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistics/')
      .then(response => {
        const { purchaseTypeStats, announcementTypeStats } = response.data;

        if (purchaseTypeStats && announcementTypeStats) {
          setData({
            purchaseTypeData: {
              labels: Object.keys(purchaseTypeStats),
              datasets: [{
                label: 'Skelbimų Kiekis Per Savaitę Pagal Pirkimo Rūšį',
                data: Object.values(purchaseTypeStats),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }],
            },
            announcementTypeData: {
              labels: Object.keys(announcementTypeStats),
              datasets: [{
                label: 'Skelbimų Kiekis Per Savaitę Pagal Skelbimų Tipą',
                data: Object.values(announcementTypeStats),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              }],
            },
          });
        }
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

    // Define chart options with legend turned off
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Turn off the legend
          }
        }
      };
  return (
    <div className="chart-container">
    <div className="chart">
      <h2>Skelbimų Kiekis Per Savaitę Pagal Pirkimo Rūšį</h2>
      <Bar data={data.purchaseTypeData} options={chartOptions} />
    </div>

    <div className="chart">
      <h2>Skelbimų Kiekis Per Savaitę Pagal Skelbimų Tipą</h2>
      <Bar data={data.announcementTypeData} options={chartOptions} />
    </div>
  </div>
  );
}

export default DataVisualization;
