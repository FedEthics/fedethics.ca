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
                    
                    <form class="newsletter-form" id="fedethics-form">
                        <input type="email" name="email" id="email" placeholder="Email address" required />
                        
                        <!-- Button Group -->
                        <div style="display: flex; gap: 10px; margin-top: 10px; justify-content: center;">
                            <button type="submit" class="btn btn-gold">Subscribe</button>
                            <button type="button" id="unsubscribe-btn" class="btn btn-outline-light" style="cursor: pointer;">Unsubscribe</button>                        </div>
                        
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
                        <a href="pages/book-hub.html#newsletter">Newsletter</a>
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

        // Attach event listeners after rendering the HTML
        const form = this.querySelector('#fedethics-form');
        const unsubscribeBtn = this.querySelector('#unsubscribe-btn');

        form.addEventListener('submit', this.handleSubscription.bind(this));
        unsubscribeBtn.addEventListener('click', this.handleUnsubscribe.bind(this));
    }

    async handleSubscription(event) {
        event.preventDefault(); // Stop form from refreshing the page
        
        // Use this.querySelector to scope elements only within the footer
        const statusDiv = this.querySelector('#form-status');
        const email = this.querySelector('#email').value;
        
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
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (response.ok) {
                statusDiv.textContent = "Welcome to the Dispatch!";
                statusDiv.style.color = "#D4AF37"; 
                this.querySelector('#fedethics-form').reset();
            } else {
                statusDiv.textContent = result.error || "Subscription failed. Please try again.";
                statusDiv.style.color = "red";
            }
        } catch (error) {
            statusDiv.textContent = "Service unavailable. Please try later.";
            statusDiv.style.color = "red";
        }
    }

    async handleUnsubscribe() {
        const emailInput = this.querySelector('#email');
        const statusDiv = this.querySelector('#form-status');
        const email = emailInput.value;

        // Basic validation before sending
        if (!email || !emailInput.checkValidity()) {
            statusDiv.style.color = 'red';
            statusDiv.innerText = 'Please enter a valid email address to unsubscribe.';
            return;
        }

        statusDiv.style.color = '#333';
        statusDiv.innerText = 'Processing request...';

        try {
            const response = await fetch('/api/unsubscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (response.ok) {
                statusDiv.style.color = 'green';
                statusDiv.innerText = 'You have been successfully unsubscribed.';
                emailInput.value = ''; // Clear the input
            } else {
                const data = await response.json();
                statusDiv.style.color = 'red';
                statusDiv.innerText = data.error || 'Something went wrong. Please try again.';
            }
        } catch (error) {
            statusDiv.style.color = 'red';
            statusDiv.innerText = 'Network error. Please try again later.';
        }
    }
}

customElements.define('footer-section', FooterSection);