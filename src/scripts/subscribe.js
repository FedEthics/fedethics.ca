// The single newsletter submit implementation for the whole site.
// Replaces the two divergent handlers that previously lived in
// js/frame.js (handleSubscription) and inline in pages/subscribe.html.
//
// Used by both the lightweight footer band (vanilla, no framework) and the
// richer React form on /newsletter/, so the network contract stays in one place.

export const ENDPOINT = 'https://fedethics.ca/subscribe/';

/**
 * POST an email to the newsletter API.
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function submitSubscription(email) {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const payload = await res.json().catch(() => ({}));

    if (res.ok && payload.success !== false) return { ok: true };
    return { ok: false, error: payload.error || null };
  } catch (err) {
    return { ok: false, error: null, network: true };
  }
}
