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

export default function App() {
  const loginRef = useRef(null);
  const signupRef = useRef(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(window.location.pathname === '/advisory');
  const searchRef = useRef(null);
  const openLogin = () => loginRef.current?.showModal();
  const openSignup = () => setSignupOpen(true);
  const openSearch = () => searchRef.current?.showModal();

  useEffect(() => {
    const onPopState = () => setAdvisoryOpen(window.location.pathname === '/advisory');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const openAdvisory = () => { window.history.pushState({}, '', '/advisory'); setAdvisoryOpen(true); window.scrollTo(0, 0); };
  const closeAdvisory = () => { window.history.pushState({}, '', '/'); setAdvisoryOpen(false); window.scrollTo(0, 0); };

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
      {advisoryOpen ? <AdvisoryChat onBack={closeAdvisory}/> : <><Header onSignIn={openLogin} onSignUp={openSignup} onSearch={openSearch}/>
      <main id="home">
        <Hero onSignIn={openLogin} onSignUp={openSignup}/>
        <IntroStrip/>
        <Services onDiscover={openAdvisory}/>
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
