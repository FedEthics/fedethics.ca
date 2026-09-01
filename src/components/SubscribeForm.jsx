import { useEffect, useState } from 'react';
import { translations, resolveLang, DEFAULT_LANG } from '../i18n/subscribe.js';
import { submitSubscription } from '../scripts/subscribe.js';

/**
 * The translated newsletter form on /newsletter/.
 *
 * This is the one place on the site where React earns its keep: four languages,
 * a loading/success/error state machine, and inputs that lock after success.
 * The sitewide footer band uses plain JS against the same submitSubscription().
 */
export default function SubscribeForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  // Server-render in English, then adopt ?lang= after mount so the markup matches.
  const [lang, setLang] = useState(DEFAULT_LANG);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get('lang');
    setLang(resolveLang(param));
  }, []);

  // Errors clear themselves so the form stays usable after a failed attempt.
  useEffect(() => {
    if (status !== 'error') return;
    const timer = setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 4000);
    return () => clearTimeout(timer);
  }, [status]);

  const t = translations[lang];

  async function handleSubmit(event) {
    event.preventDefault();
    const value = email.trim();
    if (!value || status === 'loading') return;

    if (typeof window.track === 'function') window.track('newsletter_signup');

    setStatus('loading');
    setMessage('');

    const result = await submitSubscription(value);

    if (result.ok) {
      setStatus('success');
      setMessage(t.success);
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.network ? t.network_error : result.error || t.fail);
    }
  }

  const isDone = status === 'success';
  const statusColor =
    status === 'success' ? '#1A5C38' : status === 'error' ? '#8B1A1A' : 'inherit';

  return (
    <form className="subscribe-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label className="form-label" htmlFor="email">{t.label}</label>
        <div className="form-input-wrap">
          <span className="email-icon" aria-hidden="true">✉</span>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            placeholder={t.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDone}
            required
            autoComplete="email"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`subscribe-btn${isDone ? ' success' : ''}`}
        disabled={status === 'loading' || isDone}
        style={status === 'error' ? { background: '#8B1A1A' } : undefined}
      >
        <span>{status === 'loading' ? t.loading : isDone ? t.success : t.btn}</span>
        {status === 'idle' && <span className="btn-arrow">→</span>}
      </button>

      <p
        role="status"
        aria-live="polite"
        style={{ fontSize: '0.82rem', fontWeight: 600, marginTop: '10px', minHeight: '20px', color: statusColor }}
      >
        {status === 'loading' ? '' : message}
      </p>

      <p className="form-disclaimer">{t.disclaimer}</p>
    </form>
  );
}
