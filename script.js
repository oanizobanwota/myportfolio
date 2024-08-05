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
document.addEventListener("DOMContentLoaded", function() {
    const emailMeButton = document.getElementById("emailMeButton");
    emailMeButton.addEventListener("click", function() {
        const subject = "Contact Form Submission";
        const body = "Hi Onyebuchi,\n\nI would like to get in touch with you.";
        const mailtoLink = `mailto:buchi-n@msn.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    });

 // Handle navigation without refreshing the page
 const navLinks = document.querySelectorAll('nav a[data-page]');
 navLinks.forEach(link => {
     link.addEventListener('click', function(event) {
         event.preventDefault();
         const page = this.getAttribute('data-page');
         loadPage(page);
         history.pushState(null, '', page);
     });
 });

 // Function to load page content dynamically
 function loadPage(page) {
     fetch(page)
         .then(response => response.text())
         .then(data => {
             document.querySelector('main').innerHTML = new DOMParser().parseFromString(data, 'text/html').querySelector('main').innerHTML;
         })
         .catch(error => console.error('Error loading page:', error));
 }

 // Handle back/forward navigation
 window.addEventListener('popstate', function() {
     const page = location.pathname.split('/').pop();
     loadPage(page);
 });
});