document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const savePrefsBtn = document.getElementById('savePrefs');
    const triggerAnimationBtn = document.getElementById('triggerAnimation');
    const animatedBox = document.getElementById('animatedBox');
    const body = document.body;

    // Load saved preferences
    loadPreferences();

    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            theme: themeSelect.value,
            animation: animationSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyPreferences(preferences);
        
        // Show feedback animation
        this.textContent = 'Saved!';
        setTimeout(() => {
            this.textContent = 'Save Preferences';
        }, 2000);
    });

    // Trigger animation button
    triggerAnimationBtn.addEventListener('click', function() {
        const animationType = animationSelect.value;
        triggerAnimation(animationType);
    });

    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            themeSelect.value = preferences.theme;
            animationSelect.value = preferences.animation;
            applyPreferences(preferences);
        }
    }

    // Function to apply preferences
    function applyPreferences(preferences) {
        // Remove all theme classes first
        body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        body.classList.add(preferences.theme);
        
        // Set animation type (but don't play it yet)
        animatedBox.className = 'animated-box';
    }

    // Function to trigger animation
    function triggerAnimation(animationType) {
        // Reset animation
        animatedBox.className = 'animated-box';
        
        // Force reflow to restart animation
        void animatedBox.offsetWidth;
        
        // Apply new animation
        animatedBox.classList.add(animationType);
        
        // Change box color based on animation
        switch(animationType) {
            case 'bounce':
                animatedBox.style.backgroundColor = '#FF5722';
                animatedBox.textContent = 'Bounce!';
                break;
            case 'spin':
                animatedBox.style.backgroundColor = '#2196F3';
                animatedBox.textContent = 'Spin!';
                break;
            case 'pulse':
                animatedBox.style.backgroundColor = '#9C27B0';
                animatedBox.textContent = 'Pulse!';
                break;
        }
        
        // Stop animation after 3 seconds
        setTimeout(() => {
            animatedBox.className = 'animated-box';
            animatedBox.style.backgroundColor = '#4CAF50';
            animatedBox.textContent = '';
        }, 3000);
    }

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});