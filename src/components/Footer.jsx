import Brand from './Brand.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Brand footer />
      <span className="footer-note">A digital platform for a connected agricultural future.</span>
      <span className="footer-copy">&copy; {new Date().getFullYear()} Kilimo Stack</span>
    </footer>
  );
}
