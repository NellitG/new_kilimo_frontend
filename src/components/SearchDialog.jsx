import { useState } from 'react';
import services from '../data/services.js';

export default function SearchDialog({ dialogRef }) {
  const [query, setQuery] = useState('');
  const filteredServices = services.filter((service) => `${service.title} ${service.description}`.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <dialog className="search-dialog" ref={dialogRef} aria-label="Search Kilimo Stack">
      <button className="dialog-close" aria-label="Close search" onClick={() => dialogRef.current?.close()}>&times;</button>
      <label htmlFor="service-search">Search services</label>
      <input id="service-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try advisory or data exchange"/>
      <div className="search-results">
        {filteredServices.length ? filteredServices.map((service) => <a className="search-result" key={service.title} href="#services" onClick={() => dialogRef.current?.close()}><strong>{service.title}</strong><span>{service.description}</span></a>) : <div className="no-results">No services match that search.</div>}
      </div>
    </dialog>
  );
}
