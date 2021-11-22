import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loading from './pages/Loading';
import './App.css';

const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const CryptoDetail = React.lazy(() => import('./pages/CryptoDetail'));

export default function App() {
  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode) {
      document.documentElement.className = mode;
    } else {
      localStorage.setItem('mode', 'light');
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <CacheSwitch>
          <Redirect exact from="/" to="/home" />
          <CacheRoute path="/home" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/crypto/:cryptoId" component={CryptoDetail} />
        </CacheSwitch>
      </Suspense>
    </Router>
  );
}
