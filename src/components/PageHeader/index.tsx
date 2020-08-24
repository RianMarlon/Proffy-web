import React, { ReactElement } from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
  namePage: string,
  title: string,
  description?: string,
  headerRight?: ReactElement,
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return(
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar"/>
        </Link>
        <p>{ props.namePage }</p>
        <img src={logoImg} alt="Proffy"/>
      </div>

      <div className="header-content">
        <div className="title">
          <strong>{props.title}</strong>
          {props.description && <p>{props.description}</p>}
        </div>
        { props.headerRight && (
          <div className="right">
            { props.headerRight }
          </div>
        )}
      </div>

      <div className="header-children">
        {props.children}
      </div>
    </header>
  );
}

export default PageHeader;