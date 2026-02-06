/**
 * Individual Project Page functionality
 * Loads project data based on URL slug
 */

// Initialize project page
document.addEventListener('DOMContentLoaded', async () => {
  const projectContainer = document.getElementById('project-detail');
  if (!projectContainer) return;
  
  // Get slug from URL
  const pathParts = window.location.pathname.split('/');
  const filename = pathParts[pathParts.length - 1];
  const slug = filename.replace('.html', '');
  
  await loadProject(slug);
});

/**
 * Load and render project data
 */
async function loadProject(slug) {
  const data = await fetchData('../data/projects.json');
  if (!data || !data.projects) {
    showError('Failed to load project data');
    return;
  }
  
  const project = data.projects.find(p => p.slug === slug);
  if (!project) {
    showError('Project not found');
    return;
  }
  
  renderProject(project);
}

/**
 * Render project details
 */
function renderProject(project) {
  const container = document.getElementById('project-detail');
  if (!container) return;
  
  // Update page title
  document.title = `${project.title} | Talha Bin Najaf Malik`;
  
  // Generate links HTML
  const linksHtml = generateLinksHtml(project.links);
  
  // Generate tech stack HTML
  const techStackHtml = project.tech_stack.map(tech => 
    `<span class="chip">${tech}</span>`
  ).join('');
  
  // Generate highlights HTML
  const highlightsHtml = project.highlights.map(h => 
    `<li>${h}</li>`
  ).join('');
  
  container.innerHTML = `
    <nav class="breadcrumbs">
      <a href="../index.html">Home</a>
      <span>›</span>
      <a href="../projects.html">Projects</a>
      <span>›</span>
      <span>${project.title}</span>
    </nav>
    
    <div class="project-hero">
      <img src="../${project.banner}" alt="${project.title}" class="project-banner"
           onerror="this.src='../assets/projects/placeholder-banner.jpg'">
      
      <h1 class="project-title">${project.title}</h1>
      <p class="project-summary">${project.summary}</p>
      
      <div class="project-meta">
        <div class="meta-item">
          <span class="meta-label">Role</span>
          <span class="meta-value">${project.role}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Year</span>
          <span class="meta-value">${project.date}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Category</span>
          <span class="meta-value">${project.category}</span>
        </div>
      </div>
    </div>
    
    <div class="project-sections">
      <div class="project-section">
        <h3>Problem / Goal</h3>
        <p>${project.summary}</p>
      </div>
      
      <div class="project-section">
        <h3>Approach</h3>
        <ul>
          ${highlightsHtml}
        </ul>
      </div>
      
      <div class="project-section">
        <h3>Tech Stack</h3>
        <div class="tech-stack">
          ${techStackHtml}
        </div>
      </div>
      
      <div class="project-section">
        <h3>Challenges & Solutions</h3>
        <p>${project.challenges}</p>
      </div>
      
      <div class="project-section">
        <h3>Future Improvements</h3>
        <p>${project.improvements}</p>
      </div>
      
      ${linksHtml ? `
        <div class="project-section">
          <h3>Links</h3>
          <div class="project-links">
            ${linksHtml}
          </div>
        </div>
      ` : ''}
    </div>
    
    <div class="back-button">
      <a href="../projects.html" class="btn btn-secondary">← Back to Projects</a>
    </div>
  `;
}

/**
 * Generate links HTML
 */
function generateLinksHtml(links) {
  if (!links) return '';
  
  let html = '';
  
  if (links.github) {
    html += `<a href="${links.github}" target="_blank" rel="noopener" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
      GitHub
    </a>`;
  }
  
  if (links.demo) {
    html += `<a href="${links.demo}" target="_blank" rel="noopener" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
      Demo
    </a>`;
  }
  
  if (links.video) {
    html += `<a href="${links.video}" target="_blank" rel="noopener" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
        <line x1="7" y1="2" x2="7" y2="22"/>
        <line x1="17" y1="2" x2="17" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="2" y1="7" x2="7" y2="7"/>
        <line x1="2" y1="17" x2="7" y2="17"/>
        <line x1="17" y1="17" x2="22" y2="17"/>
        <line x1="17" y1="7" x2="22" y2="7"/>
      </svg>
      Video
    </a>`;
  }
  
  if (links.report) {
    html += `<a href="../${links.report}" target="_blank" class="btn btn-secondary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
      Report
    </a>`;
  }
  
  return html;
}

/**
 * Show error message
 */
function showError(message) {
  const container = document.getElementById('project-detail');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${message}</p>
        <a href="../projects.html" class="btn btn-secondary">Back to Projects</a>
      </div>
    `;
  }
}
