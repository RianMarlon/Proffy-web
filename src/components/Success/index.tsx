import React from 'react';

import successCheckIcon from '../../assets/images/icons/success-check-icon.svg';
import { Link } from 'react-router-dom';

import './styles.css';

interface SuccessProps {
  title: string,
  description: string,
  textButton: string,
  routeButton: string,
}

const Success: React.FC<SuccessProps> = ({ title, description, textButton, routeButton }) => {
  return (
    <div className="success-container">
      <div>
        <div className="text-container">
          <img src={successCheckIcon} alt="" />
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <Link className="button" to={routeButton}>
          <p>{textButton}</p>
        </Link>
      </div>
    </div>
  );
}

export default Success;