import { useState } from 'react';
import services from '../data/services.js';

export default function SignUpDialog({ open, onClose, onSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  if (!open) return null;
  return (
    <div className="signup-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => { if (event.key === 'Escape') onClose(); }}>
    <section className="login-dialog signup-dialog" role="dialog" aria-modal="true" aria-labelledby="signup-title">
      <button type="button" className="dialog-close" aria-label="Close sign up" onClick={onClose}>&times;</button>
      <div className="dialog-kicker">KILIMO STACK ACCOUNT</div>
      <h2 id="signup-title">Join the <em>network.</em></h2>
      <p>Create an account to access Kilimo Stack services.</p>
      <form onSubmit={(event) => { event.preventDefault(); setMessage('Account registration is not connected yet. Connect the registration endpoint to create your account.'); }}>
        <label htmlFor="signup-service">Choose a service</label>
        <select id="signup-service" name="service" required defaultValue="" autoFocus>
          <option value="" disabled>Select a service</option>
          {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
        </select>
        <label htmlFor="signup-name">Name</label>
        <input id="signup-name" name="name" type="text" autoComplete="name" required placeholder="Your full name" />
        <label htmlFor="signup-email">Email address</label>
        <input id="signup-email" name="email" type="email" autoComplete="email" required placeholder="you@example.org" />
        <label htmlFor="signup-phone">Phone number</label>
        <input id="signup-phone" name="phone" type="tel" autoComplete="tel" required placeholder="e.g. +254 700 000 000" />
        <label htmlFor="signup-password">Password</label>
        <div className="password-wrap">
          <input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength="8" required placeholder="At least 8 characters" />
          <button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
        </div>
        <div className="login-message" role="status" aria-live="polite">{message}</div>
        <button className="button button-primary login-submit" type="submit">Create account <span aria-hidden="true">&rarr;</span></button>
      </form>
      <div className="dialog-foot">Already have an account? <button type="button" className="dialog-link" onClick={onSignIn}>Sign in</button></div>
    </section>
    </div>
  );
}
