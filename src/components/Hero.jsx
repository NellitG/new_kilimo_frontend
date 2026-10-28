export default function Hero({ onSignIn }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-line" /> KALRO DIGITAL AGRICULTURE</div>
        <h1 id="hero-title">Knowledge that<br />grows <em>with you.</em></h1>
        <p className="hero-intro">Connecting agricultural research, practical advice and digital services to support a more productive, resilient food system.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#services">Explore services <span aria-hidden="true">&rarr;</span></a><button className="button button-text" onClick={onSignIn}>Sign in to your account <span aria-hidden="true">&#8599;</span></button></div>
        <div className="hero-note">
          <span className="note-dot" />
          <span>Built around Kenya&apos;s agricultural knowledge and innovation ecosystem</span></div>
      </div>
      <div className="hero-visual">
        <img className="hero-image" src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85" alt="Rows of crops growing across a green agricultural landscape" />
        <div className="image-shade" />
        <div className="image-caption"><span className="caption-kicker">CONNECTED FOR GROWTH</span><strong>From research<br />to the field.</strong><span className="caption-rule" />
        </div>
        <div className="image-index"><span>01</span>
          <span className="index-line" /><span>04</span>
        </div>
      </div>
      {/* <div className="field-stamp" aria-hidden="true">
          <svg viewBox="0 0 48 48"><path d="M24 42V23M24 30C13 30 9 23 9 13c9 0 15 4 15 17ZM24 25c0-9 6-14 15-14 0 9-4 15-15 15"/></svg></div>
      </div> */}
      <div className="hero-bottom"><span>01 &mdash; A CONNECTED AGRICULTURAL ECOSYSTEM</span><span>RESEARCH&nbsp;&nbsp; &middot; &nbsp;&nbsp;KNOWLEDGE&nbsp;&nbsp; &middot; &nbsp;&nbsp;INNOVATION</span></div>
    </section>
  );
}
