import Icon from './Icon.jsx';

export default function ServiceCard({ service, onDiscover }) {
  return (
    <article className="service-card">
      <div className="service-icon"><Icon name={service.icon}/></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      {['Agricultural Advisory', 'OAN Network', 'Data Exchange', 'Knowledge & Resources', 'Farmer & Organization Services'].includes(service.title) ? <button className="card-link" type="button" onClick={onDiscover}>{service.title === 'Agricultural Advisory' ? 'Discover service' : 'Open service'} <span aria-hidden="true">&rarr;</span></button> : <a className="card-link" href="#about">Discover service <span aria-hidden="true">&rarr;</span></a>}
    </article>
  );
}
