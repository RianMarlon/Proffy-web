import React from 'react';

import proffyLogo from '../../assets/images/logo.svg';

import './styles.css';

const Proffy: React.FC = () => {
  return (
    <div className="proffy-container">
      <div>
        <div>
          <img className="logo" src={proffyLogo} alt="Logo" />
          <div className="slogan-container">
            <h2>Sua plataforma de estudos online.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proffy;