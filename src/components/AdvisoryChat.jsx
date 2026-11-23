import { useEffect, useRef, useState } from 'react';
import Brand from './Brand.jsx';

const suggestions = [
  'How can I improve soil fertility for maize?',
  'What are the early signs of fall armyworm?',
  'How often should I irrigate tomatoes in dry weather?',
];
const endpoint = import.meta.env.VITE_ADVISORY_CHAT_ENDPOINT;
const SAVED_CHAT_KEY = 'kilimostack-farmer-advisory-chat';

export default function AdvisoryChat({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(value = question) {
    const text = value.trim();
    if (!text || loading) return;
    setError('');
    setSaved(false);
    setQuestion('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setLoading(true);
    try {
      if (!endpoint) throw new Error('The advisory service is not configured yet. Set VITE_ADVISORY_CHAT_ENDPOINT to your backend chat endpoint.');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: text, messages: next }),
      });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `The advisory service returned an error (${response.status}).`);
      }
      const data = await response.json();
      const answer = data.answer ?? data.response ?? data.message;
      if (typeof answer !== 'string' || !answer.trim()) throw new Error('The advisory service returned an empty or unexpected response. Please try again.');
      setMessages((current) => [...current, { role: 'assistant', content: answer.trim() }]);
    } catch (err) {
      setError(err instanceof TypeError ? 'Could not connect to the advisory service. Check your connection and try again.' : err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function saveChat() {
    try {
      window.localStorage.setItem(SAVED_CHAT_KEY, JSON.stringify(messages));
      setSaved(true);
      setError('');
    } catch {
      setError('Could not save this chat in this browser. Check available storage and try again.');
    }
  }

  function clearChat() {
    setMessages([]);
    setQuestion('');
    setError('');
    setSaved(false);
    try { window.localStorage.removeItem(SAVED_CHAT_KEY); } catch { /* Clearing the current conversation still succeeds. */ }
  }

  useEffect(() => {
    try {
      const savedMessages = JSON.parse(window.localStorage.getItem(SAVED_CHAT_KEY) || 'null');
      if (Array.isArray(savedMessages) && savedMessages.every((item) => ['user', 'assistant'].includes(item?.role) && typeof item?.content === 'string')) {
        setMessages(savedMessages);
        setSaved(true);
      }
    } catch { /* Ignore unavailable or invalid browser storage. */ }
  }, []);

  return <main className="advisory-page">
    <header className="advisory-topbar"><button type="button" className="back-link" onClick={onBack} aria-label="Back to KilimoStack">← <span>Back to services</span></button><Brand/><span className="secure-label"><i/> Farmer Advisory AI</span></header>
    <section className="chat-shell" aria-label="Farmer Advisory AI chat">
      <div className="chat-heading"><div className="assistant-mark" aria-hidden="true">✳</div><div className="chat-title-copy"><p className="chat-kicker">AGRICULTURAL ADVISORY</p><h1>Farmer Advisory <em>AI</em></h1><p className="chat-subtitle">Practical guidance for your farm, powered by agricultural knowledge.</p></div><div className="chat-actions"><button type="button" onClick={saveChat} disabled={messages.length === 0 || loading} aria-label="Save chat in this browser">{saved ? '✓ Saved' : 'Save chat'}</button><button type="button" className="clear-chat-button" onClick={clearChat} disabled={messages.length === 0 || loading}>Clear chat</button></div></div>
      <div className="chat-transcript" ref={listRef} aria-live="polite" aria-label="Conversation">
        {messages.length === 0 ? <div className="welcome-card"><span className="welcome-icon">✳</span><h2>Welcome, farmer.</h2><p>Ask me about crops, pests, soil, water, livestock, or any other farming question. I’ll help you explore practical next steps.</p><div className="suggestions-label">SUGGESTED QUESTIONS</div><div className="suggestions">{suggestions.map((item) => <button type="button" key={item} onClick={() => sendMessage(item)} disabled={loading}>{item}<span>↗</span></button>)}</div></div> : messages.map((message, index) => <article key={`${message.role}-${index}`} className={`chat-message ${message.role}`}><div className="message-avatar">{message.role === 'user' ? 'You' : '✳'}</div><div className="message-content"><span className="message-name">{message.role === 'user' ? 'You' : 'Farmer Advisory AI'}</span><p>{message.content}</p></div></article>)}
        {loading && <div className="chat-message assistant"><div className="message-avatar">✳</div><div className="message-content"><span className="message-name">Farmer Advisory AI</span><div className="typing-dots" role="status" aria-label="Generating a response"><i/><i/><i/></div></div></div>}
      </div>
      {error && <div className="chat-error" role="alert"><span>{error}</span><button type="button" onClick={() => setError('')}>Dismiss</button></div>}
      <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><label className="sr-only" htmlFor="farmer-question">Ask your farming question</label><textarea id="farmer-question" ref={inputRef} value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="Ask a farming question..." rows="1" maxLength="2000" disabled={loading}/><button className="send-button" type="submit" disabled={loading || !question.trim()} aria-label="Send question">{loading ? <span className="send-spinner"/> : '↑'}</button><div className="composer-hint">Enter to send · Shift + Enter for a new line <span>{question.length}/2000</span></div></form>
      <p className="chat-disclaimer">Advice is general guidance. Local conditions vary; consult an agricultural extension officer for urgent or high risk decisions.</p>
    </section>
  </main>;
}
