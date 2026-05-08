const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.querySelector('#course-container');
const totalCreditsElement = document.querySelector('#total-credits span');

function displayCourses(filteredCourses) {
    // Clear the container first
    courseContainer.innerHTML = '';

    // Render course cards
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        
        // Add specific class based on completion status
        if (course.completed) {
            courseCard.classList.add('completed');
            courseCard.innerHTML = `✔ ${course.subject} ${course.number}`;
        } else {
            courseCard.classList.add('incomplete');
            courseCard.innerHTML = `${course.subject} ${course.number}`;
        }
        
        courseContainer.appendChild(courseCard);
    });

    // Calculate total credits using reduce
    const totalCredits = filteredCourses.reduce((accumulator, course) => accumulator + course.credits, 0);
    totalCreditsElement.textContent = totalCredits;
}

// Event Listeners for Filter Buttons
document.querySelector('#all').addEventListener('click', () => {
    displayCourses(courses);
});

document.querySelector('#wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

document.querySelector('#cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

// Display all courses on initial load
displayCourses(courses);