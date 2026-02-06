/**
 * Main JavaScript for Aerospace Portfolio
 * Handles navigation, starfield, and shared functionality
 */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStarfield();
  initMobileMenu();
  setActiveNavLink();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background on scroll
    if (currentScroll > 50) {
      navbar.style.background = 'rgba(11, 15, 23, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)';
      navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === 'index.html' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Create starfield background
 */
function initStarfield() {
  const starfield = document.querySelector('.starfield');
  if (!starfield) return;
  
  const starCount = window.innerWidth < 768 ? 40 : 80;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random size (mostly small)
    const size = Math.random() < 0.8 ? 1 + Math.random() * 2 : 2 + Math.random() * 2;
    
    // Random opacity
    const opacity = 0.2 + Math.random() * 0.5;
    
    star.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
    `;
    
    starfield.appendChild(star);
  }
}

/**
 * Utility: Fetch JSON data
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

/**
 * Utility: Create element with attributes
 */
function createElement(tag, attributes = {}, text = '') {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else {
      element.setAttribute(key, value);
    }
  });
  if (text) element.textContent = text;
  return element;
}

/**
 * Utility: Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
