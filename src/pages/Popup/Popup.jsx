import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import 'chartjs-plugin-datalabels';
import logo from '../../assets/img/logo.svg';
import './Popup.css';
import { Link, Route } from 'react-router-dom';
import Newtab from '../Newtab/Newtab';

const Popup = () => {
  const [gasData, setGasData] = useState(null);
  const [selectedApi, setSelectedApi] = useState('eth'); // Default selected API

  const apiOptions = [
    { label: 'Ethereum', value: 'eth' },
    { label: 'Polygon', value: 'poly' }
  ];

  useEffect(() => {
    fetchData(selectedApi)
      .then(data => setGasData(data.result))
      .catch(error => console.error('Error fetching gas data:', error));
  }, [selectedApi]);

  const fetchData = async (selectedApi) => {
    let apiUrl = '';

    if (selectedApi === 'eth') {
      apiUrl = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&gasprice=2000000000&apikey=UT42FXQ9C8J4YJNSV2R6BN9HR3M157HW66';
    } else if (selectedApi === 'poly') {
      apiUrl = 'https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=IJTQPQAXA78FH5AC5PKWVDKT6IK5TYZD2X';
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, BarElement);
  }, []);

  const handleApiChange = (event) => {
    setSelectedApi(event.target.value);
  };

  const renderChart = () => {
    if (!gasData) {
      return null;
    }

    const labels = ['Safe Gas Price', 'Fast Gas Price', 'Suggested Base Fee'];
    const prices = [
      gasData.SafeGasPrice,
      gasData.FastGasPrice,
      gasData.suggestBaseFee
    ];

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Gas Prices',
          data: prices,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1,
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true,
        },
      },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
          formatter: (value) => `Value: ${value}`,
          color: '#000'
        }
      }
    };

    return (
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="navbar-logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="navbar-menu">
              <ul className="navbar-menu-list">
                <li className="navbar-menu-item">
                  <Link to="/Newtab" className="navbar-menu-link">Home</Link>
                </li>
                <li className="navbar-menu-item">
                  <Link to="/Newtab" className="navbar-menu-link">About</Link>
                </li>
              </ul>
            </div>
          </nav>


          <div>
            <select value={selectedApi} onChange={handleApiChange}>
              {apiOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Route path="/Newtab" component={Newtab} />


          <Bar data={chartData} options={chartOptions} />
          <div className="gas-price-text">
            <p>
              Safe|Fast|Suggested: {prices[0]}|{prices[1]}|{parseFloat(Number(prices[2]).toFixed(1))}
            </p>
          </div>
        </header>
      </div>
    );
  };

  return renderChart();
};

export default Popup;
