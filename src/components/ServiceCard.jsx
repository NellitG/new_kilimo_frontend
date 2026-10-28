import Icon from './Icon.jsx';

export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <div className="service-icon"><Icon name={service.icon}/></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <a className="card-link" href="#about">Discover service <span aria-hidden="true">&rarr;</span></a>
    </article>
  );
}
