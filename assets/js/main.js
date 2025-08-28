document.addEventListener('DOMContentLoaded', () => {

    // --- Theme (Dark/Light Mode) Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply theme from localStorage or system preference
    const applyTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'light' || (!storedTheme && !systemPrefersDark)) {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    };
    
    // Event listener for the toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }
    applyTheme(); // Apply theme on initial load

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        });

        document.querySelectorAll('a, button, .cert-card, .project-card-new').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)');
            el.addEventListener('mouseleave', () => cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)');
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
});

// --- Particles.js Initialization ---
if (document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": false },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
        },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" } }, "modes": { "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0 } } },
        "retina_detect": true
    });
}