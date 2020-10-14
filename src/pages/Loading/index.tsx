import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

function Loading() {
  return (
    <div className="loading-container">
      <img src={logoImg} alt="Proffy" />
    </div>
  );
}

export default Loading;
