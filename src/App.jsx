import { useEffect, useRef } from 'react';
import ClosingBanner from './components/ClosingBanner.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import IntroStrip from './components/IntroStrip.jsx';
import SearchDialog from './components/SearchDialog.jsx';
import Services from './components/Services.jsx';
import SignInDialog from './components/SignInDialog.jsx';

export default function App() {
  const loginRef = useRef(null);
  const searchRef = useRef(null);
  const openLogin = () => loginRef.current?.showModal();
  const openSearch = () => searchRef.current?.showModal();

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
      <Header onSignIn={openLogin} onSearch={openSearch}/>
      <main id="home">
        <Hero onSignIn={openLogin}/>
        <IntroStrip/>
        <Services/>
        <ClosingBanner onSignIn={openLogin}/>
      </main>
      <Footer/>
      <SignInDialog dialogRef={loginRef}/>
      <SearchDialog dialogRef={searchRef}/>
    </>
  );
}
