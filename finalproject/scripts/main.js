// main.js - Core functionality for all pages

// 1. ES Module Export/Import: Hamburger Menu Logic
export function initMenu() {
    const menuBtn = document.querySelector('#menu-btn');
    const navUl = document.querySelector('nav ul');

    if (menuBtn && navUl) {
        menuBtn.addEventListener('click', () => {
            navUl.classList.toggle('open');
            // Accessibility update
            const isExpanded = navUl.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// 2. Local Storage: Track User Visits
export function initLocalStorage() {
    const visitMsg = document.querySelector('#visit-message');
    if (!visitMsg) return;

    let numVisits = Number(window.localStorage.getItem('kemet-visits-ls')) || 0;
    
    if (numVisits !== 0) {
        visitMsg.textContent = `Welcome back to Maison Kemet. You have consulted our archives ${numVisits} times.`;
    } else {
        visitMsg.textContent = `Welcome to your first bespoke consultation at Maison Kemet.`;
    }
    
    numVisits++;
    localStorage.setItem('kemet-visits-ls', numVisits);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initLocalStorage();
});