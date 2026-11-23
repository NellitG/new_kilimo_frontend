import services from '../data/services.js';
import ServiceCard from './ServiceCard.jsx';

export default function Services({ onDiscover, onDiscoverOan, onOpenService }) {
  return (
    <section className="services-section" id="services">
      <div className="section-heading">
        <div><div className="eyebrow"><span className="eyebrow-line"/> ONE PLATFORM, MANY POSSIBILITIES</div><h2>Explore the <em>ecosystem.</em></h2></div>
        <p>Discover connected services for agricultural knowledge, advisory and data exchange.</p>
      </div>
      <div className="service-grid">{services.map((service) => <ServiceCard key={service.title} service={service} onDiscover={() => {
        if (service.title === 'Agricultural Advisory') return onDiscover();
        if (service.title === 'OAN Network' || service.title === 'Data Exchange') return onDiscoverOan();
        return onOpenService(service.title);
      }}/>)}</div>
      <div className="services-foot"><span>Designed to connect the agricultural community</span><span className="foot-leaf" aria-hidden="true">&#10036;</span></div>
    </section>
  );
}
