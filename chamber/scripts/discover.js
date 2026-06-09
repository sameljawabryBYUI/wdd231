// scripts/discover.js
import { places } from '../data/places.mjs';

// 1. Render Discover Cards
const grid = document.getElementById('discover-grid');

places.forEach((place, index) => {
    const card = document.createElement('section');
    card.className = `discover-card card-${index + 1}`;
    
    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.image}" alt="View of ${place.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more">Learn More</button>
    `;
    grid.appendChild(card);
});

// 2. LocalStorage Visit Message Logic
const messageContainer = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisitDate');
const now = Date.now();

if (!lastVisit) {
    messageContainer.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - parseInt(lastVisit);
    const msInDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifference / msInDay);

    if (timeDifference < msInDay) {
        messageContainer.textContent = "Back so soon! Awesome!";
    } else {
        messageContainer.textContent = `You last visited ${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago.`;
    }
}

// Store the current visit time
localStorage.setItem('lastVisitDate', now.toString());
// 3. Populate Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;