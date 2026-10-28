export default function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#home" aria-label="Kilimo Stack home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40"><path d="M20 34V17M20 23C10 23 7 17 7 9c8 0 13 3 13 14ZM20 19c0-8 5-12 13-12 0 8-3 13-13 13"/><path d="M11 34h18"/></svg>
      </span>
      <span className="brand-copy"><strong>KILIMO <i>STACK</i></strong><small>AGRICULTURAL KNOWLEDGE, CONNECTED</small></span>
    </a>
  );
}
