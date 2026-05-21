// --- FOOTER DATES & MENU TOGGLE ---
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const menuButton = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
});

// --- OPENWEATHERMAP API LOGIC ---
const myKey = "7e61d2f7b96d87ff5915c954b2d0b884"; // Your activated API key
const lat = "48.8566"; // Latitude for Paris
const lon = "2.3522";  // Longitude for Paris

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${myKey}`;

// Fetch Current Weather
async function fetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.getElementById('current-weather');
    
    // FIX: Explicitly stating https:// so local servers don't block it
const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;
    
    // Capitalize each word in description
    const formatDesc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');

    weatherContainer.innerHTML = `
        <div class="weather-item">
            <img src="${iconsrc}" alt="${desc} icon">
            <p><strong>${Math.round(data.main.temp)}&deg;F</strong></p>
        </div>
        <p>${formatDesc}</p>
        <p>High: ${Math.round(data.main.temp_max)}&deg;F</p>
        <p>Low: ${Math.round(data.main.temp_min)}&deg;F</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

// Fetch 3-Day Forecast
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error("Error fetching forecast:", error);
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = '';
    
    // Grab indices 8, 16, and 24 to get approx same time for tomorrow, day 2, and day 3
    const threeDayForecast = [data.list[8], data.list[16], data.list[24]];

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);
        const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <strong>${weekday}:</strong> 
                <span>${Math.round(day.main.temp)}&deg;F</span>
            </div>
        `;
    });
}

// --- SPOTLIGHTS LOGIC ---
const membersUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        // Filter strictly for Gold and Silver membership levels
        const qualifiedMembers = data.filter(member => 
            member.membershipLevel === 'Gold' || 
            member.membershipLevel === 'Silver' || 
            member.membershipLevel === 3 || 
            member.membershipLevel === 2
        );
        
        // Shuffle the filtered members randomly
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        
        // Take exactly 3 random members to showcase
        const selectedMembers = shuffled.slice(0, 3);
        
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p><em>${member.membershipLevel} Member</em></p>
            <hr>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p><strong>Email:</strong> <a href="mailto:${member.email || 'info@company.com'}">Email Us</a></p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>URL:</strong> <a href="${member.website}" target="_blank">Website</a></p>
        `;
        
        container.appendChild(card);
    });
}

// Initialize execution
fetchCurrentWeather();
fetchForecast();
getSpotlights();