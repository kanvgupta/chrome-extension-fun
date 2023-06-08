import React, { useState } from 'react';
import './Newtab.css';


const Newtab = () => {
  const [wei, setWei] = useState('');
  const [gwei, setGwei] = useState('');
  const [eth, setEth] = useState('');

  const handleWeiChange = (value) => {
    setWei(value);
    setGwei((parseFloat(value) / 10 ** 9).toString());
    setEth((parseFloat(value) / 10 ** 18).toString());
  };

  const handleGweiChange = (value) => {
    setGwei(value);
    setWei((parseFloat(value) * 10 ** 9).toString());
    setEth((parseFloat(value) / 10 ** 9 / 10 ** 9).toString());
  };

  const handleEthChange = (value) => {
    setEth(value);
    setWei((parseFloat(value) * 10 ** 18).toString());
    setGwei((parseFloat(value) * 10 ** 9 * 10 ** 9).toString());
  };

  return (
    <div className="calculator">
      <div className="inputs">
        <input
          type="number"
          placeholder="Wei"
          value={wei}
          onChange={(e) => handleWeiChange(e.target.value)}
        />
        <span>Wei</span>
        <input
          type="number"
          placeholder="Gwei"
          value={gwei}
          onChange={(e) => handleGweiChange(e.target.value)}
        />
        <span>Gwei</span>
        <input
          type="number"
          placeholder="ETH"
          value={eth}
          onChange={(e) => handleEthChange(e.target.value)}
        />
        <span>ETH</span>
      </div>
    </div>
  );
};

export default Newtab;