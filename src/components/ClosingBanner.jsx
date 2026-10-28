export default function ClosingBanner({ onSignIn }) {
  return (
    <section className="closing-banner">
      <div>
        <div className="eyebrow eyebrow-light"><span className="eyebrow-line"/> GOOD KNOWLEDGE GROWS</div>
        <h2>Make knowledge<br/>work <em>for everyone.</em></h2>
      </div>
      <button className="button button-light" onClick={onSignIn}>Continue to Kilimo Stack <span aria-hidden="true">&rarr;</span></button>
      <div className="banner-ring" aria-hidden="true"/>
    </section>
  );
}
