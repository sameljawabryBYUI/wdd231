// Get the current year
const currentYear = new Date().getFullYear();
document.querySelector('#currentyear').textContent = currentYear;

// Get the last modified date of the document
const lastModified = document.lastModified;
document.querySelector('#lastModified').textContent = `Last Modification: ${lastModified}`;