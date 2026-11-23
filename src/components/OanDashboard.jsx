import { useCallback, useEffect, useMemo, useState } from 'react';
import Brand from './Brand.jsx';

const endpoint = import.meta.env.VITE_OAN_DASHBOARD_ENDPOINT;
const sections = [
  ['overview', 'Network overview'], ['architecture', 'Network architecture'], ['participants', 'Participants'],
  ['baps', 'BAP management'], ['bpps', 'BPP management'], ['schemas', 'Domain schemas'],
  ['registry', 'Registry records'], ['transactions', 'Network transactions'], ['events', 'Transaction events'], ['monitoring', 'Network monitoring'],
];
const stats = [
  ['participants', 'Total participants', '◎'], ['baps', 'Registered BAPs', '▣'], ['bpps', 'Registered BPPs', '▤'],
  ['activeConnections', 'Active connections', '↔'], ['transactions', 'Network transactions', '⇄'], ['domainSchemas', 'Domain schemas', '⌘'],
  ['registryRecords', 'Registry records', '▤'], ['transactionEvents', 'Transaction events', '◷'],
];
const fields = {
  participants: ['name', 'participantId', 'category', 'type', 'domain', 'registrationStatus', 'connectionStatus', 'registrationDate'],
  baps: ['name', 'subscriberId', 'applicationUrl', 'supportedDomains', 'supportedActions', 'registrationStatus', 'lastActivity'],
  bpps: ['name', 'subscriberId', 'providerCategory', 'supportedDomains', 'publishedServices', 'endpoint', 'registrationStatus', 'lastActivity'],
  schemas: ['name', 'domain', 'version', 'description', 'registrationStatus', 'createdAt'],
  registry: ['subscriberId', 'name', 'subscriberType', 'domain', 'endpoint', 'verification', 'registrationStatus', 'updatedAt'],
  transactions: ['transactionId', 'transactionType', 'consumerApplication', 'serviceProvider', 'domain', 'status', 'initiatedAt', 'updatedAt'],
  events: ['eventId', 'transactionId', 'action', 'sender', 'receiver', 'timestamp', 'processingStatus', 'responseStatus'],
  monitoring: ['participant', 'endpoint', 'connectivityStatus', 'successfulRequests', 'failedRequests', 'responseTime', 'processingStatus', 'lastError'],
};
const labels = { participantId: 'Participant ID', subscriberId: 'Subscriber ID', category: 'Category', type: 'Type', domain: 'Domain', registrationStatus: 'Registration', connectionStatus: 'Connection', registrationDate: 'Registered', name: 'Name', applicationUrl: 'Application URL', supportedDomains: 'Domains', supportedActions: 'Actions', lastActivity: 'Last activity', providerCategory: 'Category', publishedServices: 'Published services', endpoint: 'Endpoint', version: 'Version', description: 'Description', createdAt: 'Created', subscriberType: 'Type', verification: 'Verification', updatedAt: 'Updated', transactionId: 'Transaction ID', transactionType: 'Type', consumerApplication: 'Consumer app', serviceProvider: 'Provider', status: 'Status', initiatedAt: 'Initiated', eventId: 'Event ID', action: 'Action', sender: 'Sender', receiver: 'Receiver', timestamp: 'Timestamp', processingStatus: 'Processing', responseStatus: 'Response', participant: 'Participant', connectivityStatus: 'Connectivity', successfulRequests: 'Successful', failedRequests: 'Failed', responseTime: 'Response time', lastError: 'Recent error' };
const asText = (value) => Array.isArray(value) ? value.join(', ') : value == null || value === '' ? '—' : typeof value === 'object' ? JSON.stringify(value) : String(value);

export default function OanDashboard({ onBack }) {
  const [section, setSection] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [nodeInfo, setNodeInfo] = useState('');
  const [event, setEvent] = useState(null);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    if (!endpoint) { setData(null); setError('OAN network data is not connected. Configure VITE_OAN_DASHBOARD_ENDPOINT with the existing backend dashboard endpoint.'); setLoading(false); return; }
    try {
      const response = await fetch(endpoint, { headers: { Accept: 'application/json' }, credentials: 'include' });
      if (!response.ok) throw new Error(`The network service returned an error (${response.status}).`);
      const result = await response.json();
      if (!result || typeof result !== 'object') throw new Error('The network service returned an unexpected response.');
      setData(result);
    } catch (err) { setData(null); setError(err instanceof TypeError ? 'Could not connect to the network service. Check your connection and try again.' : err.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  const records = Array.isArray(data?.[section]) ? data[section] : [];
  const filtered = useMemo(() => records.filter((row) => {
    const textMatch = !query || JSON.stringify(row).toLowerCase().includes(query.toLowerCase());
    const status = row.registrationStatus || row.status || row.connectivityStatus || row.processingStatus;
    return textMatch && (filter === 'all' || String(status || '').toLowerCase() === filter);
  }), [records, query, filter]);

  return <div className="oan-app">
    <aside className="oan-sidebar"><button className="oan-back" onClick={onBack}>← <span>KilimoStack</span></button><Brand/><div className="oan-side-label">NETWORK OPERATIONS</div><nav aria-label="OAN Network sections">{sections.map(([id, title]) => <button key={id} className={section === id ? 'active' : ''} onClick={() => { setSection(id); setQuery(''); setFilter('all'); setEvent(null); }}><span className="nav-dot"/>{title}</button>)}</nav><div className="sidebar-protocol"><span>OPEN NETWORK</span><strong>Beckn Protocol</strong><small>Interoperable by design</small></div></aside>
    <main className="oan-main"><header className="oan-header"><div><span className="oan-overline">OPEN AGRICULTURE NETWORK</span><h1>{sections.find(([id]) => id === section)?.[1]}</h1></div><div className="oan-header-actions"><span className={`network-indicator ${data ? 'connected' : ''}`}><i/>{data ? 'Backend connected' : 'Status unavailable'}</span><button className="refresh-button" onClick={load} disabled={loading}>{loading ? 'Refreshing…' : '↻ Refresh'}</button></div></header>
      {error && <div className="oan-alert" role="alert"><span>{error}</span><button onClick={load} disabled={loading}>Retry</button></div>}
      {loading && <div className="oan-loading" role="status"><i/><span>Loading network data…</span></div>}
      {!loading && section === 'overview' && <>
        <div className="oan-intro"><div><strong>One network. Many agricultural systems.</strong><p>Independent platforms discover services and coordinate transactions through shared Beckn Protocol interactions.</p></div><span className="protocol-chip">BECKN · OPEN STANDARDS</span></div>
        <div className="oan-stats">{stats.map(([key, title, icon]) => <article className="oan-stat" key={key}><div className="stat-icon">{icon}</div><div className="stat-title">{title}</div><strong>{data?.overview?.[key] ?? data?.[key] ?? '—'}</strong><small>{data?.overview?.[`${key}Trend`] ?? ''}</small></article>)}</div>
        <div className="oan-overview-grid"><section className="oan-panel architecture-panel"><div className="panel-heading"><div><span className="oan-overline">HOW THE NETWORK CONNECTS</span><h2>Network architecture</h2></div><button onClick={() => setSection('architecture')}>Explore diagram ↗</button></div><Architecture onSelect={setNodeInfo}/></section><section className="oan-panel health-panel"><div className="panel-heading"><div><span className="oan-overline">LIVE OPERATIONS</span><h2>Network health</h2></div><button onClick={() => setSection('monitoring')}>Monitoring ↗</button></div><div className="health-empty"><span className="health-mark">⌁</span><p>{Array.isArray(data?.monitoring) && data.monitoring.length ? `${data.monitoring.length} endpoint records received` : 'Connectivity health appears when the backend provides verified endpoint checks.'}</p></div><div className="activity-heading">RECENT NETWORK ACTIVITY</div>{Array.isArray(data?.events) && data.events.length ? data.events.slice(0, 4).map((item, i) => <button key={item.eventId || i} className="activity-row" onClick={() => { setSection('events'); setEvent(item); }}><i className="activity-dot"/><span><strong>{asText(item.action || item.eventId)}</strong><small>{asText(item.transactionId)} · {asText(item.timestamp)}</small></span></button>) : <p className="activity-empty">No activity data provided by the network service.</p>}</section></div>
      </>}
      {!loading && section === 'architecture' && <section className="oan-panel full-panel"><div className="panel-heading"><div><span className="oan-overline">DISCOVERY · INTERACTION · CALLBACKS</span><h2>Independent systems, connected by protocol</h2></div></div><p className="diagram-intro">BAP applications discover and request services. BPP platforms publish offers and respond through Beckn protocol messages, while registries support subscriber discovery and network callbacks carry transaction updates.</p><Architecture onSelect={setNodeInfo} large/><div className="diagram-note">Diagram explains protocol roles; live status is only shown when verified backend monitoring data is available.</div></section>}
      {!loading && !['overview', 'architecture'].includes(section) && <section className="oan-panel records-panel"><div className="panel-heading records-heading"><div><span className="oan-overline">NETWORK DATA</span><h2>{sections.find(([id]) => id === section)?.[1]}</h2></div><span className="record-count">{records.length} records</span></div><div className="table-tools"><label className="oan-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search network records…"/></label><select aria-label="Filter by status" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="pending">Pending</option><option value="inactive">Inactive</option><option value="failed">Failed</option><option value="connected">Connected</option><option value="disconnected">Disconnected</option></select></div>{event && section === 'events' && <EventDetail item={event} onClose={() => setEvent(null)}/>}<div className="table-scroll"><table className="oan-table"><thead><tr>{(fields[section] || []).map((field) => <th key={field}>{labels[field] || field}</th>)}<th>Inspect</th></tr></thead><tbody>{filtered.map((row, index) => <tr key={row.participantId || row.subscriberId || row.transactionId || row.eventId || row.name || index}>{(fields[section] || []).map((field) => <td key={field}>{field.toLowerCase().includes('status') ? <Status value={row[field]}/> : <span title={asText(row[field])}>{asText(row[field])}</span>}</td>)}<td><button className="inspect-button" onClick={() => setSelected(row)}>Details ↗</button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="table-empty"><span>⌕</span><strong>{records.length ? 'No records match your search' : 'No records available'}</strong><p>{records.length ? 'Adjust the search or status filter.' : 'The backend has not supplied records for this section.'}</p></div>}</div></section>}
      <footer className="oan-footer"><span>OAN · Open Agriculture Network</span><span>Network status and records reflect backend data only.</span></footer>
    </main>
    {selected && <div className="detail-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><aside className="record-detail"><button className="detail-close" onClick={() => setSelected(null)} aria-label="Close details">×</button><span className="oan-overline">NETWORK RECORD</span><h2>{asText(selected.name || selected.transactionId || selected.eventId || selected.subscriberId || selected.participantId)}</h2>{Object.entries(selected).map(([key, value]) => <div className="detail-field" key={key}><span>{labels[key] || key}</span><strong>{asText(value)}</strong></div>)}{selected.requestPayload && <Payload title="Request payload" value={selected.requestPayload}/ >}{selected.responsePayload && <Payload title="Response payload" value={selected.responsePayload}/>}</aside></div>}
    {nodeInfo && <div className="detail-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setNodeInfo(''); }}><aside className="record-detail node-detail"><button className="detail-close" onClick={() => setNodeInfo('')} aria-label="Close details">×</button><span className="oan-overline">NETWORK ROLE</span><h2>{nodeInfo}</h2><p>{nodeDescription(nodeInfo)}</p><div className="diagram-note">Participant identities and operational status are provided by the connected network service.</div></aside></div>}
  </div>;
}

function nodeDescription(name) { return ({ 'BAP applications': 'Consumer facing applications initiate discovery and transaction requests on behalf of farmers, buyers, and other network users.', 'BPP platforms': 'Provider platforms publish agricultural services and respond to discovery and transaction requests.', 'Beckn protocol': 'Shared protocol specifications define interoperable messages, actions, domains, and transaction callbacks.', 'Network registry': 'Registry services support subscriber lookup and discovery of network participants.', 'Transaction callbacks': 'Asynchronous callbacks carry status updates across the transaction lifecycle.' })[name] || 'Agricultural participants use independent systems and exchange information through shared protocol interactions.'; }
function Architecture({ onSelect, large = false }) { const nodes = ['BAP applications', 'Beckn protocol', 'Network registry', 'BPP platforms', 'Transaction callbacks']; return <div className={`architecture ${large ? 'architecture-large' : ''}`}><div className="architecture-flow"><div className="flow-side"><button className="flow-node participant-node" onClick={() => onSelect('BAP applications')}><span>CONSUMER SIDE</span><strong>Farm & market apps</strong><small>BAP · discover / select / init</small></button><button className="flow-node provider-node" onClick={() => onSelect('BPP platforms')}><span>PROVIDER SIDE</span><strong>Agri service platforms</strong><small>BPP · publish / fulfill</small></button></div><div className="protocol-line"><span/><button className="protocol-node" onClick={() => onSelect('Beckn protocol')}><small>COMMON LANGUAGE</small><strong>BECKN PROTOCOL</strong><small>open APIs · domain schemas</small></button><span/></div><div className="flow-bottom"><button className="flow-node registry-node" onClick={() => onSelect('Network registry')}><span>DISCOVERY LAYER</span><strong>Subscriber registry</strong></button><div className="flow-arrow">↕</div><button className="flow-node events-node" onClick={() => onSelect('Transaction callbacks')}><span>ASYNC NETWORK</span><strong>Callbacks · transaction events</strong></button></div></div><div className="architecture-legend"><i/><span>Protocol interaction path</span><span className="diagram-label">{nodes.length} network roles</span></div></div>; }
function Status({ value }) { const status = String(value || 'unknown').toLowerCase(); const tone = ['active', 'connected', 'healthy', 'success', 'completed'].some((v) => status.includes(v)) ? 'good' : ['pending', 'warning', 'processing'].some((v) => status.includes(v)) ? 'warn' : ['failed', 'disconnected', 'error', 'inactive'].some((v) => status.includes(v)) ? 'bad' : 'unknown'; return <span className={`status-pill ${tone}`}><i/>{asText(value)}</span>; }
function EventDetail({ item, onClose }) { return <div className="event-inspector"><div><strong>Event inspection · {asText(item.eventId)}</strong><button onClick={onClose}>Close ×</button></div>{item.requestPayload && <Payload title="Request payload" value={item.requestPayload}/ >}{item.responsePayload && <Payload title="Response payload" value={item.responsePayload}/ >}{!item.requestPayload && !item.responsePayload && <p>Payload details were not included in the backend response or are not available for this record.</p>}</div>; }
function Payload({ title, value }) { let formatted; try { formatted = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 2); } catch { formatted = String(value); } return <div className="payload-block"><strong>{title}</strong><pre>{formatted}</pre></div>; }
