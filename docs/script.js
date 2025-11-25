// Project Details Toggle
function toggleProject(projectId) {
    const details = document.getElementById(`${projectId}-details`);
    const isActive = details.classList.contains('active');
    const parentCard = details.closest('.project-card');
    const currentIndicator = parentCard.querySelector('.expand-indicator');
    
    // Store the original text from the current indicator (without the arrow)
    const currentText = currentIndicator.textContent.replace(/^[▼▲]\s*/, '');
    
    // Close all project details and reset all indicators to collapsed state
    document.querySelectorAll('.project-details').forEach(detail => {
        detail.classList.remove('active');
    });
    
    document.querySelectorAll('.expand-indicator').forEach(indicator => {
        const text = indicator.textContent.replace(/^[▼▲]\s*/, '');
        indicator.innerHTML = `▼ ${text}`;
    });
    
    // Toggle current project
    if (!isActive) {
        details.classList.add('active');
        if (currentIndicator) {
            currentIndicator.innerHTML = `▲ ${currentText}`;
        }
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Carousel functionality
let currentSlide = 0;
const carousel = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const totalSlides = cards.length;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem
    carousel.scrollTo({
        left: currentSlide * (cardWidth + gap),
        behavior: 'smooth'
    });
    updateDots();
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === currentSlide ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Initialize carousel dots
document.addEventListener('DOMContentLoaded', () => {
    updateDots();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.stat-card, .trifecta-card, .project-card, .skill-category');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Skills slider scroll function
let currentSkillsPage = 0;
const skillsPerPage = 6; // 3 columns x 2 rows

function scrollSkills(direction) {
    const skillCategories = document.querySelectorAll('.skill-category');
    const totalPages = Math.ceil(skillCategories.length / skillsPerPage);
    
    currentSkillsPage += direction;
    
    // Loop around
    if (currentSkillsPage < 0) currentSkillsPage = totalPages - 1;
    if (currentSkillsPage >= totalPages) currentSkillsPage = 0;
    
    // Hide all categories first
    skillCategories.forEach((category, index) => {
        const startIndex = currentSkillsPage * skillsPerPage;
        const endIndex = startIndex + skillsPerPage;
        
        if (index >= startIndex && index < endIndex) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
}

// Initialize skills display on page load
document.addEventListener('DOMContentLoaded', () => {
    scrollSkills(0);
});
