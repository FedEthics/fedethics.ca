// consent.js — Google Consent Mode v2 defaults.
// MUST load synchronously in <head> BEFORE Google Tag Manager / Analytics so that
// no analytics or advertising cookies are set until the visitor opts in.
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  // Expose gtag early; per-page inline snippets redeclare the same function harmlessly.
  window.gtag = window.gtag || gtag;

  // Default: deny everything that stores identifying data until the user accepts.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // Restore a previously granted choice so returning visitors are not re-prompted.
  try {
    if (localStorage.getItem('fe-cookie-consent') === 'granted') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    }
  } catch (e) { /* localStorage unavailable — stay denied */ }
})();
