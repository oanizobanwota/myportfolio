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