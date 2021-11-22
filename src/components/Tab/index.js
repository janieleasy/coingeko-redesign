import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

export function Tab({ children, active = 0 }) {
  const { url } = useRouteMatch();

  const [activeTab, setActiveTab] = useState(active);
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    let temp = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const {
        props: { name, children },
      } = element;

      temp = [...temp, { name, content: children }];
    });

    setTabsData(temp);
  }, [children]);

  return (
    <>
      <nav className="tab-container">
        <ul className="tab-list">
          {tabsData.map(({ name }, idx) => (
            <li className="tab-item" key={idx}>
              <Link
                className={idx === activeTab ? 'tab-link active' : 'tab-link'}
                to={`${url}?section=${name}`}
                onClick={() => setActiveTab(idx)}
                replace
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="tab-section">
        {tabsData[activeTab] && tabsData[activeTab].content}
      </section>
    </>
  );
}

export function Pane({ children }) {
  return { children };
}

Tab.Pane = Pane;

Tab.propTypes = {
  children: PropTypes.any.isRequired,
  active: PropTypes.number,
};
