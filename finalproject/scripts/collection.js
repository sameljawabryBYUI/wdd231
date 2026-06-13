// collection.js - Handles external data and DOM manipulation for the Collection page
import { initMenu } from './main.js';

const grid = document.querySelector('#fabric-grid');
const modal = document.querySelector('#fabric-modal');
const modalTitle = document.querySelector('#modal-title');
const modalDetails = document.querySelector('#modal-details');
const closeModal = document.querySelector('#close-modal');
const filterBtn = document.querySelector('#filter-heavy');

let fabricData = [];

// Fetch API with Try...Catch
async function fetchFabrics() {
    try {
        const response = await fetch('data/fabrics.json');
        if (!response.ok) throw new Error('Data source not found');
        
        fabricData = await response.json();
        displayFabrics(fabricData);
    } catch (error) {
        if (grid) {
            grid.innerHTML = `<p style="color:red">Error loading collection: ${error.message}</p>`;
        }
    }
}

// Dynamic Content Generation & Template Literals
function displayFabrics(fabrics) {
    if (!grid) return;
    grid.innerHTML = ''; 
    
    fabrics.forEach(fabric => {
        const article = document.createElement('article');
        article.classList.add('fabric-card');
        
        // Template Literal
        article.innerHTML = `
            <h3>${fabric.name}</h3>
            <p><strong>Weave:</strong> ${fabric.weave}</p>
            <p><strong>Origin:</strong> ${fabric.origin}</p>
            <p><strong>Weight:</strong> ${fabric.weight}</p>
            <button data-id="${fabric.id}" class="view-btn">View Details</button>
        `;
        grid.appendChild(article);
    });

    // Attach Event Listeners to generated buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            openModal(id);
        });
    });
}

// Array Method: Filter
if (filterBtn) {
    filterBtn.addEventListener('click', () => {
        const heavyFabrics = fabricData.filter(f => f.weight === 'Heavy');
        displayFabrics(heavyFabrics);
    });
}

// Modal Dialog Logic
function openModal(id) {
    // Array Method: Find
    const fabric = fabricData.find(f => f.id === id);
    if (fabric && modal && modalTitle && modalDetails) {
        modalTitle.textContent = fabric.name;
        modalDetails.innerHTML = `This exquisite ${fabric.weave} is sourced directly from ${fabric.origin}. Known for its ${fabric.weight.toLowerCase()} drape, it is ideal for structural silhouettes.`;
        modal.showModal();
    }
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.close();
    });
}

// Initialize Fetch
if (grid) {
    fetchFabrics();
}