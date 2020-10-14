import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { removeToken } from '../../services/auth';

import offIcon from '../../assets/images/icons/off-icon.svg';

import './styles.css';
import AuthContext from '../../contexts/AuthContext';

export interface HeaderProfileProps {
  image: string,
  name: string,
  email: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ image, name, email }) => {

  const { checkToken } = useContext(AuthContext);

  function onClickOff() {
    removeToken();
    checkToken();
  }

  return (
    <header className="header-profile-container">
      <Link to="/my-profile" className="my-profile-block">
        <img
          src={image}
          alt="Avatar"
        />
        <p>
          { name }
        </p>
      </Link>
      <button type="button" onClick={onClickOff} className="button-off-block" >
        <img
          src={offIcon}
          alt="Sair"
        />
      </button>
    </header>
  );
}

export default HeaderProfile;