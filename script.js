document.addEventListener("DOMContentLoaded", function() {
    const heading = document.getElementById("animated-heading");
    const text = heading.textContent; // Use textContent to get the text content
    heading.innerHTML = "";

    text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        if (char === " ") {
            span.style.marginRight = "0.5em"; // Add margin for space character
        }
        span.textContent = char; // Use textContent to set the text content
        span.style.animationDelay = `${index * 0.1}s`;
        heading.appendChild(span);
    });
});
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);

    // Create an email body from the form data
    let emailBody = '';
    formData.forEach((value, key) => {
        emailBody += `${key}: ${value}\n`;
    });

    // Create a mailto link and simulate a click to open the email client
    const mailtoLink = `mailto:buchi-n@msn.com?subject=Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
});
