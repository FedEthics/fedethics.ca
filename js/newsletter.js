async function handleSubscription(event) {
    event.preventDefault(); // Stop form from refreshing the page
    
    const statusDiv = document.getElementById('form-status');
    const email = document.getElementById('email').value;
    // const fname = document.getElementById('fname').value;
    
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
                email: email,
                // first_name: fname // Note: Update app.py if you want to save the name too
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
}