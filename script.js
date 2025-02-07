const menuBtn = document.querySelector('nav h4');
const sidebar = document.querySelector('.sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close menu when clicking a link
const sidebarLinks = document.querySelectorAll('.sidebar h3 a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.project, .card, #center h4, .moving-content').forEach(el => {
    observer.observe(el);
});

// Smooth animation for moving content
const movingContent = document.querySelector('.moving-content');
if (movingContent) {
    let scrollPosition = 0;
    const scrollSpeed = 2;

    function updateScroll() {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= movingContent.scrollWidth / 2) {
            scrollPosition = 0;
        }
        movingContent.scrollLeft = scrollPosition;
        requestAnimationFrame(updateScroll);
    }
    updateScroll();
}

// Handle animated circles
const handleAnimatedCircles = () => {
    const circles = document.querySelectorAll('.anime1, .anime2, .anime3');
    circles.forEach(circle => {
        let rect = circle.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            circle.style.transform = `translate(${Math.random() * 20 - 10}%, ${Math.random() * 20 - 10}%)`;
        }
    });
};

// Optimize animations for better performance
window.addEventListener('scroll', () => {
    requestAnimationFrame(handleAnimatedCircles);
});

// Resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Adjust elements based on screen size
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        // Adjust animation speeds based on screen size
        document.documentElement.style.setProperty('--animation-speed', 
            isSmallMobile ? '8s' : isMobile ? '6s' : '4s');
        
        // Adjust blur effects for better mobile performance
        const blurElements = document.querySelectorAll('.anime1, .anime2, .anime3, .bg-ani');
        blurElements.forEach(el => {
            el.style.filter = `blur(${isSmallMobile ? '10px' : '20px'})`;
        });
    }, 250);
});

// Touch event handling for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Handle horizontal swipe for galleries or sliders if needed
        if (diff > 0) {
            // Swipe right
            console.log('Swiped right');
        } else {
            // Swipe left
            console.log('Swiped left');
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial resize handling
    window.dispatchEvent(new Event('resize'));
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize animations
    handleAnimatedCircles();
});








