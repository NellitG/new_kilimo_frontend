import { useState } from 'react';
import Brand from './Brand.jsx';
import Icon from './Icon.jsx';

export default function Header({ onSignIn, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const closeMenu = (section) => { setActive(section); setMenuOpen(false); };

  return (
    <header className="topbar">
      <Brand />
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
      <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
        <a className={`nav-link${active === 'home' ? ' active' : ''}`} href="#home" onClick={() => closeMenu('home')}>Home</a>
        <a className={`nav-link${active === 'services' ? ' active' : ''}`} href="#services" onClick={() => closeMenu('services')}>Our services</a>
        <a className={`nav-link${active === 'about' ? ' active' : ''}`} href="#about" onClick={() => closeMenu('about')}>About</a>
        <button className="search-trigger" onClick={onSearch}><Icon name="search"/><span>Search</span><kbd>/</kbd></button>
        <button className="button button-small button-outline" onClick={onSignIn}>Sign in <span aria-hidden="true">&#8599;</span></button>
      </nav>
    </header>
  );
}
