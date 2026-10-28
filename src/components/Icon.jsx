const icons = {
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16M8 7h8M8 11h8"/></>,
  sprout: <path d="M12 21V11M12 15c-6 0-8-3-8-8 5 0 8 2 8 8ZM12 12c0-5 3-8 8-8 0 5-2 8-8 8Z"/>,
  network: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.3 10.8 7.4-3.6M8.3 13.2l7.4 3.6"/></>,
  people: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20v-1.5A5.5 5.5 0 0 1 9 13h1a5.5 5.5 0 0 1 5.5 5.5V20zM16 5.3a3 3 0 0 1 0 5.8M17 14h.5a4 4 0 0 1 4 4v2h-4"/></>,
  layers: <path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>,
  search: <><circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.2 4.2"/></>,
};

export default function Icon({ name, className = '' }) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>;
}
