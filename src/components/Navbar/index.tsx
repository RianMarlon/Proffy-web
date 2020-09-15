import React from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface NavbarProps {
  namePage: string
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return(
    <nav className="top-bar-container">
      <Link to="/home">
        <img src={backIcon} alt="Voltar"/>
      </Link>
      <p>{ props.namePage }</p>
      <img src={logoImg} alt="Proffy"/>
    </nav>
  );
}

export default Navbar;
