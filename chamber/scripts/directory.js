// Dynamic Footer Dates
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = lastModified;

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

menuToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

// JSON Fetch and DOM Manipulation for Directory
const url = 'data/members.json';
const directoryContainer = document.getElementById('directory-container');

async function getMembersData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching the members data:', error);
        directoryContainer.innerHTML = '<p>Sorry, the business directory could not be loaded at this time.</p>';
    }
}

function displayMembers(members) {
    members.forEach((member) => {
        // Create elements
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');

        // Populate elements
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        
        website.textContent = "Visit Website";
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        
        // LIGHTHOUSE FIX 1: Gives screen readers a unique name for each link
        website.setAttribute('aria-label', `Visit the ${member.name} website`);

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        
        // LIGHTHOUSE FIX 2: Explicit width and height stops the page from shifting
        logo.setAttribute('width', '250'); 
        logo.setAttribute('height', '200'); 
        
        // Append elements to section card
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        // Append card to main container
        directoryContainer.appendChild(card);
    });
}

// Grid/List View Toggle Logic
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    directoryContainer.classList.add('grid-view');
    directoryContainer.classList.remove('list-view');
    
    // Toggle active state on buttons
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    directoryContainer.classList.add('list-view');
    directoryContainer.classList.remove('grid-view');
    
    // Toggle active state on buttons
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// Initialize the fetch call
getMembersData();