window.handleSubscription = async function(event) {
    event.preventDefault(); // Stop form from refreshing the page
    
    const statusDiv = document.getElementById('form-status');
    const email = document.getElementById('email').value;
    
    // Optional: Call existing tracking function
    if (typeof track === 'function') track('newsletter_signup');

    statusDiv.textContent = "Sending...";
    statusDiv.style.color = "inherit";

    try {
        const response = await fetch('https://fedethics.ca/subscribe/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email
            })
        });

        const result = await response.json();

        if (response.ok) {
            statusDiv.textContent = "Welcome to the Dispatch!";
            statusDiv.style.color = "#D4AF37"; 
            document.getElementById('fedethics-form').reset();
        } else {
            statusDiv.textContent = result.error || "Subscription failed. Please try again.";
            statusDiv.style.color = "red";
        }
    } catch (error) {
        statusDiv.textContent = "Service unavailable. Please try later.";
        statusDiv.style.color = "red";
    }
};

class FooterSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <!-- Integrated Newsletter Section -->
    <section class="newsletter-section" id="newsletter">
        <div class="container">
            <div class="newsletter-inner">
            <div class="eyebrow eyebrow-light" style="justify-content:center;">Stay Connected</div>
            <h2>The FedEthics Dispatch</h2>
            <p>AI governance insights, book updates, and speaking announcements — delivered to executives, policy leaders, and senior practitioners. No noise. Unsubscribe anytime.</p>
            
            <form class="newsletter-form" id="fedethics-form" onsubmit="handleSubscription(event)">
                <!-- IDs -->
                <!-- <input type="text" name="fname" id="fname" placeholder="First name" /> -->
                <input type="email" name="email" id="email" placeholder="Email address" required />
                <button type="submit" class="btn btn-gold">Subscribe</button>
                
                <!-- Status Div -->
                <div id="form-status" style="margin-top: 10px; font-weight: bold;"></div>
            </form>
            
            <p class="newsletter-note">Your information is never shared. All content is published in a personal capacity, independent of any employer.</p>
            </div>
        </div>
    </section>

    <!-- Main Footer Layout -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div class="footer-brand-logo">
                        <img 
                        src="../images/FedEthics.png" 
                        alt="FE" 
                        class="footer-brand-mark" 
                        onerror="this.outerHTML='<div class=\\'footer-brand-mark\\'>FE</div>'"
                        >
                        <span class="footer-brand-name">FedEthics Inc.</span>
                    </div>
                    <p class="footer-tagline">AI governance advisory, ethical leadership frameworks, and two books by FedEthics.</p>
                    <div class="footer-imprints">
                        <span class="footer-imprint fi-advisory">FedEthics Advisory™</span>
                        <span class="footer-imprint fi-creative">FedEthics Creative™</span>
                    </div>
                    <div class="footer-social">
                        <a href="https://linkedin.com/in/celioroliveira" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
                        <a href="https://orcid.org/0009-0008-8896-9073" target="_blank" rel="noopener" aria-label="ORCID">◎</a>
                        <a href="mailto:hello-bonjour@fedethics.ca" aria-label="Email">✉</a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Navigate</h4>
                    <a href="../index.html">Home</a>
                    <a href="../pages/our-story.html">Our Story</a>
                    <a href="../pages/capabilities.html">Core Capabilities</a>
                    <a href="../pages/book-hub.html">Books</a>
                    <a href="../pages/contact.html">Contact</a>
                </div>
                <div class="footer-col">
                    <h4>Books</h4>
                    <a href="../pages/constitutional-intelligence.html">Constitutional Intelligence</a>
                    <a href="../pages/etoile-des-tournesols.html">Étoile des Tournesols</a>
                    <a href="../pages/book-hub.html#bulk">Bulk Orders</a>
                    <a href="../pages/book-hub.html#claim">Claim Your Offer</a>
                </div>
                <div class="footer-col">
                    <h4>Connect</h4>
                    <a href="mailto:hello-bonjour@fedethics.ca">hello-bonjour@fedethics.ca</a>
                    <a href="https://linkedin.com/in/celioroliveira" target="_blank" rel="noopener">LinkedIn ↗</a>
                    <a href="pages/contact.html">Speaking Enquiries</a>
                </div>
            </div>

            <div class="footer-bottom">
                <span class="footer-copy">© 2026 FedEthics Inc. All rights reserved.</span>
                <p class="footer-disclaimer">FedEthics Inc. is an independent organization. All views expressed in FedEthics publications are those of the author in a personal capacity and do not represent the position of any employer, government, or institution.</p>
            </div>
        </div>
    </footer>
    `;
  }
}
customElements.define('footer-section', FooterSection);