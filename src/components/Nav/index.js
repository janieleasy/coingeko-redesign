import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

export function Nav({ children }) {
  const [navData, setNavData] = useState([]);

  useEffect(() => {
    let temp = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const {
        props: { children, className },
      } = element;

      temp = [...temp, { children, className }];
    });

    setNavData(temp);
  }, [children]);

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        {navData.map(({ children, className }, idx) => (
          <li className={`nav-item ${className}`} key={idx}>
            {children}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Item({ children }) {
  return { children };
}

export function Link({ to, icon, children }) {
  return (
    <RouterLink to={to} className="nav-link">
      {icon && icon} {children && <span>{children}</span>}
    </RouterLink>
  );
}

Nav.Item = Item;

Nav.Link = Link;

Nav.propTypes = {
  children: PropTypes.any.isRequired,
};

Link.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.any,
  children: PropTypes.any,
};
