import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { removeToken } from '../../services/auth';
import Gravatar from 'react-gravatar';

import offIcon from '../../assets/images/icons/off-icon.svg';

import './styles.css';

export interface HeaderProfileProps {
  image: string,
  name: string,
  email: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({ image, name, email }) => {

  const history = useHistory();

  function onClickOff() {
    removeToken();
    history.push('/');
  }

  return (
    <header className="header-profile-container">
      <Link to="/my-profile" className="my-profile-block">
        {
          image ? (
            <img
              src={image}
              alt="Avatar"
            />
          ) : (
            <Gravatar
              email={email}
              alt="Avatar"
            />
          )
        }
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