import { useEffect, useRef, useState } from 'react';
import ClosingBanner from './components/ClosingBanner.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import IntroStrip from './components/IntroStrip.jsx';
import SearchDialog from './components/SearchDialog.jsx';
import Services from './components/Services.jsx';
import SignInDialog from './components/SignInDialog.jsx';
import SignUpDialog from './components/SignUpDialog.jsx';
import AdvisoryChat from './components/AdvisoryChat.jsx';
import OanDashboard from './components/OanDashboard.jsx';
import ServiceWorkspace from './components/ServiceWorkspace.jsx';

export default function App() {
  const loginRef = useRef(null);
  const signupRef = useRef(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const pageFromPath = (path) => path === '/advisory' ? 'advisory' : path === '/oan-network' ? 'oan' : path === '/resources' ? 'resources' : path === '/farmers' ? 'farmers' : 'home';
  const [activePage, setActivePage] = useState(() => pageFromPath(window.location.pathname));
  const searchRef = useRef(null);
  const openLogin = () => loginRef.current?.showModal();
  const openSignup = () => setSignupOpen(true);
  const openSearch = () => searchRef.current?.showModal();

  useEffect(() => {
    const onPopState = () => setActivePage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const navigate = (page, path) => { window.history.pushState({}, '', path); setActivePage(page); window.scrollTo(0, 0); };
  const openAdvisory = () => navigate('advisory', '/advisory');
  const openOan = () => navigate('oan', '/oan-network');
  const openResources = () => navigate('resources', '/resources');
  const openFarmers = () => navigate('farmers', '/farmers');
  const closeService = () => navigate('home', '/');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        event.preventDefault();
        searchRef.current?.showModal();
        requestAnimationFrame(() => document.querySelector('#service-search')?.focus());
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {activePage === 'advisory' ? <AdvisoryChat onBack={closeService}/> : activePage === 'oan' ? <OanDashboard onBack={closeService}/> : activePage === 'resources' || activePage === 'farmers' ? <ServiceWorkspace kind={activePage} onBack={closeService}/> : <><Header onSignIn={openLogin} onSignUp={openSignup} onSearch={openSearch}/>
      <main id="home">
        <Hero onSignIn={openLogin} onSignUp={openSignup}/>
        <IntroStrip/>
        <Services onDiscover={openAdvisory} onDiscoverOan={openOan} onOpenService={(title) => title === 'Knowledge & Resources' ? openResources() : openFarmers()}/>
        <ClosingBanner onSignIn={openSignup}/>
      </main>
      <Footer/>
      <SignInDialog dialogRef={loginRef}/>
      <SignUpDialog open={signupOpen} onClose={() => setSignupOpen(false)} onSignIn={() => { setSignupOpen(false); openLogin(); }}/>
      <SearchDialog dialogRef={searchRef}/>
      </>}
    </>
  );
}
