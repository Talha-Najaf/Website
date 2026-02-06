/**
 * Projects Marketplace functionality
 * Handles project grid rendering, filtering, and pagination
 */

let allProjects = [];
let filteredProjects = [];
let currentPage = 1;
const projectsPerPage = 6;

// Initialize projects page
document.addEventListener('DOMContentLoaded', async () => {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid) return;
  
  await loadProjects();
  setupFilters();
  setupPagination();
});

/**
 * Load projects from JSON
 */
async function loadProjects() {
  const data = await fetchData('data/projects.json');
  if (!data || !data.projects) return;
  
  allProjects = data.projects;
  filteredProjects = [...allProjects];
  
  renderProjects();
}

/**
 * Render projects grid
 */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  // Clear existing
  grid.innerHTML = '';
  
  // Calculate pagination
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const projectsToShow = filteredProjects.slice(startIndex, endIndex);
  
  // Render project cards
  projectsToShow.forEach(project => {
    const card = createProjectCard(project);
    grid.appendChild(card);
  });
  
  // Update pagination
  updatePagination();
  
  // Show empty state if no projects
  if (projectsToShow.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p style="color: var(--text-secondary);">No projects found in this category.</p>
      </div>
    `;
  }
}

/**
 * Create a project card element
 */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'card project-card';
  card.onclick = () => window.location.href = `project/${project.slug}.html`;
  
  const tagsHtml = project.tags.slice(0, 3).map(tag => 
    `<span class="chip">${tag}</span>`
  ).join('');
  
  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${project.thumbnail}" alt="${project.title}" loading="lazy" 
           onerror="this.src='assets/projects/placeholder.jpg'">
      <div class="project-card-overlay">
        <h3 class="project-card-title">${project.title}</h3>
        <div class="project-card-tags">
          ${tagsHtml}
        </div>
      </div>
    </div>
  `;
  
  return card;
}

/**
 * Setup filter buttons
 */
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-pills .chip');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      const filter = button.dataset.filter;
      if (filter === 'all') {
        filteredProjects = [...allProjects];
      } else {
        filteredProjects = allProjects.filter(p => 
          p.category.toLowerCase() === filter.toLowerCase()
        );
      }
      
      // Reset to first page and render
      currentPage = 1;
      renderProjects();
    });
  });
}

/**
 * Setup pagination
 */
function setupPagination() {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  
  updatePagination();
}

/**
 * Update pagination buttons
 */
function updatePagination() {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;
  
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }
  
  let html = '';
  
  // Previous button
  html += `
    <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
      ←
    </button>
  `;
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }
  
  // Next button
  html += `
    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
      →
    </button>
  `;
  
  pagination.innerHTML = html;
}

/**
 * Change current page
 */
function changePage(page) {
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  
  if (page < 1 || page > totalPages) return;
  
  currentPage = page;
  renderProjects();
  
  // Scroll to top of grid
  const grid = document.getElementById('projects-grid');
  if (grid) {
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
