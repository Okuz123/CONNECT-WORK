import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { subscribeMessages, sendMessage, type Message } from '../../lib/chat';

export default function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [me] = useState(() => localStorage.getItem('cw_uid') || 'guest-' + Math.random().toString(36).slice(2, 8));
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cw_uid', me);
  }, [me]);

  useEffect(() => {
    if (!chatId) return;
    const unsub = subscribeMessages(chatId, setMessages);
    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatId || !text.trim()) return;
    const t = text.trim();
    setText('');
    await sendMessage(chatId, me, t);
  };

  return (
    <div style={{ maxWidth: 680, margin: '20px auto' }}>
      <Link to="/jobs" style={{ fontSize: 14 }}>← Back</Link>

      <div className="card" style={{ marginTop: 12, maxHeight: '60vh', overflowY: 'auto' }}>
        {messages.length === 0 ? (
          <p style={{ color: 'var(--cw-text-muted)', textAlign: 'center' }}>
            No messages yet. Say hi 👋
          </p>
        ) : (
          messages.map((m) => {
            const mine = m.from === me;
            return (
              <div key={m.id} style={{
                display: 'flex',
                justifyContent: mine ? 'flex-end' : 'flex-start',
                marginBottom: 8,
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '8px 12px',
                  borderRadius: 12,
                  background: mine ? 'var(--cw-primary)' : 'var(--cw-surface-hover)',
                  color: mine ? 'white' : 'var(--cw-text)',
                  fontSize: 14,
                }}>
                  {m.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input className="input" value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…" />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}
