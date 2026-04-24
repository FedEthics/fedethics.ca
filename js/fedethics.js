// fedethics.js

// 1. Google Analytics Tracking Function
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2F5300W8X0');

function track(label) { 
  gtag('event', 'click', { event_category: 'CTA', event_label: label }); 
}

// 2. Mobile Navigation Toggle
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
}

function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
}

// 3. Load the Stripe Widget Dynamically TO FIX
function loadStripeWidget() {
  const stripeScript = document.createElement('script');
  stripeScript.src = "https://js.stripe.com/v3/buy-button.js";
  stripeScript.async = true;
  document.head.appendChild(stripeScript);
}

// Execute the function so it runs when the page loads
loadStripeWidget();