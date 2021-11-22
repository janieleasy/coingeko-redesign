import React, { useState, useEffect } from 'react';

import { Nav } from '../../components/Nav';
import { Tab } from '../../components/Tab';
import { Logo, ModeLight, ModeDark, Search } from '../../icons';

import ErrorBoundary from '../../services/errorBoundary';

import Cryptocurrency from '../../containers/Home_Cryptocurrency';
import PlaceholderPage from '../../containers/placeholder-page';

export default function Home() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode'));

  const handleMode = () => {
    setMode((mode) => (mode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.className = mode;
    localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <>
      <header>
        <Nav>
          <Nav.Item className="left">
            <button type="button" onClick={handleMode}>
              {mode === 'dark' ? <ModeDark /> : <ModeLight />}
            </button>
          </Nav.Item>
          <Nav.Item className="mid">
            <Nav.Link to="/home" icon={<Logo />} />
          </Nav.Item>
          <Nav.Item className="right">
            <Nav.Link to="/search" icon={<Search />} />
          </Nav.Item>
        </Nav>
      </header>
      <main>
        <ErrorBoundary>
          <Tab>
            <Tab.Pane name="cryptocurrency">
              <Cryptocurrency />
            </Tab.Pane>
            <Tab.Pane name="categories">
              <PlaceholderPage placeholder="categories" />
            </Tab.Pane>
            <Tab.Pane name="exchanges">
              <PlaceholderPage placeholder="exchanges" />
            </Tab.Pane>
          </Tab>
        </ErrorBoundary>
      </main>
    </>
  );
}
