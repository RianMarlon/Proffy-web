import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import api from '../../services/api';

import HeaderProfile from '../../components/HeaderProfile';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const [me, setMe] = useState({
    first_name: '',
    avatar: '',
    email: '',
  });

  useEffect(() => {
    api.get('/connections')
      .then(response => {
        const { total } = response.data;
        setTotalConnections(total);
      });

    api.get('/me')
      .then(response => {
        const { user } = response.data;
        setMe({ ...user });
      });
  }, []);

  return (
    <div id="page-landing">
      <ToastContainer />
      <HeaderProfile 
        name={me.first_name}
        image={me.avatar}
        email={me.email}
      />
      <main id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img 
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            <p>  
              Estudar
            </p>
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas"/>
            <p>  
              Dar aulas
            </p>
          </Link>
        </div>
        
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo"></img>
        </span>
      </main>
    </div>
  );
}

export default Landing;
