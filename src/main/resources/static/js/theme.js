// ==================== THEME SWITCHING ====================

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('foodiedrop-theme') || 'light';
    applyTheme(savedTheme);
    initThemeToggle();
});

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeToggleButton('dark');
    } else {
        document.body.removeAttribute('data-theme');
        updateThemeToggleButton('light');
    }
    localStorage.setItem('foodiedrop-theme', theme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('foodiedrop-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

function initThemeToggle() {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
}

function updateThemeToggleButton(theme) {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(button => {
        if (theme === 'dark') {
            button.innerHTML = '<i class="fas fa-sun"></i> Light';
            button.title = 'Switch to Light Mode';
        } else {
            button.innerHTML = '<i class="fas fa-moon"></i> Dark';
            button.title = 'Switch to Dark Mode';
        }
    });
}

// System preference detection (optional)
function getSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('foodiedrop-theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}
