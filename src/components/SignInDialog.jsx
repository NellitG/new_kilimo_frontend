import { useState } from 'react';

export default function SignInDialog({ dialogRef }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <dialog className="login-dialog" ref={dialogRef} aria-labelledby="login-title">
      <button className="dialog-close" aria-label="Close sign in" onClick={() => dialogRef.current?.close()}>&times;</button>
      <div className="dialog-kicker">KILIMO STACK ACCOUNT</div><h2 id="login-title">Welcome <em>back.</em></h2><p>Sign in with your platform account to continue.</p>
      <form onSubmit={(event) => { event.preventDefault(); setMessage('Sign-in is not connected yet. Add the existing Django authentication endpoint before enabling account access.'); }}>
        <label htmlFor="email">Email address</label><input type="email" id="email" name="email" autoComplete="username" required placeholder="you@example.org"/>
        <label htmlFor="password">Password</label>
        <div className="password-wrap"><input type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete="current-password" required placeholder="Enter your password"/><button type="button" className="password-toggle" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div>
        <div className="login-message" role="status" aria-live="polite">{message}</div><button className="button button-primary login-submit" type="submit">Sign in <span>&rarr;</span></button>
      </form>
      <div className="dialog-foot">Need an account? Contact your platform administrator.</div>
    </dialog>
  );
}
