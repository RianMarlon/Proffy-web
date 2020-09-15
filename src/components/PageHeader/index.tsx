import React, { ReactElement } from 'react';

import Navbar from '../Navbar';

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
      <Navbar 
        namePage={props.namePage}
      />

      <div className="header-content">
        <div className="title">
          <strong>{props.title}</strong>
          {props.description && <p>{props.description}</p>}
        </div>
        { props.headerRight && (
          <div className="right">
            {props.headerRight}
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
