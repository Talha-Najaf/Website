/**
 * Blog functionality
 * Handles blog listing and individual post rendering
 */

// Initialize blog page
document.addEventListener('DOMContentLoaded', async () => {
  const blogList = document.getElementById('blog-list');
  const blogPost = document.getElementById('blog-post');
  
  if (blogList) {
    await loadBlogList();
  } else if (blogPost) {
    await loadBlogPost();
  }
});

/**
 * Load and render blog list
 */
async function loadBlogList() {
  const data = await fetchData('data/posts.json');
  if (!data || !data.posts) return;
  
  const blogList = document.getElementById('blog-list');
  if (!blogList) return;
  
  // Sort by date (newest first)
  const posts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Featured post (first)
  const featured = posts[0];
  const featuredSection = document.getElementById('featured-post');
  if (featuredSection && featured) {
    featuredSection.innerHTML = `
      <div class="card blog-card" onclick="window.location.href='blog/${featured.slug}.html'">
        <img src="${featured.image}" alt="${featured.title}" class="blog-card-image"
             onerror="this.src='assets/blog/placeholder.jpg'">
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="chip">${featured.category}</span>
            <span class="mono" style="color: var(--text-secondary);">${featured.readTime}</span>
          </div>
          <h3 class="blog-card-title">${featured.title}</h3>
          <p class="blog-card-excerpt">${featured.excerpt}</p>
        </div>
      </div>
    `;
  }
  
  // Remaining posts
  const remainingPosts = posts.slice(1);
  blogList.innerHTML = '';
  
  remainingPosts.forEach(post => {
    const card = createBlogCard(post);
    blogList.appendChild(card);
  });
}

/**
 * Create blog card element
 */
function createBlogCard(post) {
  const card = document.createElement('div');
  card.className = 'card blog-card';
  card.onclick = () => window.location.href = `blog/${post.slug}.html`;
  
  card.innerHTML = `
    <img src="${post.image}" alt="${post.title}" class="blog-card-image"
         onerror="this.src='assets/blog/placeholder.jpg'">
    <div class="blog-card-content">
      <div class="blog-card-meta">
        <span class="chip">${post.category}</span>
        <span class="mono" style="color: var(--text-secondary);">${formatDate(post.date)}</span>
        <span class="mono" style="color: var(--text-secondary);">${post.readTime}</span>
      </div>
      <h3 class="blog-card-title">${post.title}</h3>
      <p class="blog-card-excerpt">${post.excerpt}</p>
    </div>
  `;
  
  return card;
}

/**
 * Load and render individual blog post
 */
async function loadBlogPost() {
  const data = await fetchData('../data/posts.json');
  if (!data || !data.posts) {
    showBlogError('Failed to load blog post');
    return;
  }
  
  // Get slug from URL
  const pathParts = window.location.pathname.split('/');
  const filename = pathParts[pathParts.length - 1];
  const slug = filename.replace('.html', '');
  
  const post = data.posts.find(p => p.slug === slug);
  if (!post) {
    showBlogError('Blog post not found');
    return;
  }
  
  renderBlogPost(post);
}

/**
 * Render blog post content
 */
function renderBlogPost(post) {
  const container = document.getElementById('blog-post');
  if (!container) return;
  
  // Update page title
  document.title = `${post.title} | Talha Bin Najaf Malik`;
  
  // Convert markdown-like content to HTML
  const contentHtml = convertMarkdown(post.content);
  
  container.innerHTML = `
    <nav class="breadcrumbs">
      <a href="../index.html">Home</a>
      <span>›</span>
      <a href="../blog.html">Blog</a>
      <span>›</span>
      <span>${post.title}</span>
    </nav>
    
    <article class="post-content">
      <header class="post-header">
        <div class="post-meta">
          <span class="chip">${post.category}</span>
          <span class="mono" style="color: var(--text-secondary);">${formatDate(post.date)}</span>
          <span class="mono" style="color: var(--text-secondary);">${post.readTime}</span>
        </div>
        <h1 class="post-title">${post.title}</h1>
      </header>
      
      ${contentHtml}
    </article>
    
    <div class="back-button">
      <a href="../blog.html" class="btn btn-secondary">← Back to Blog</a>
    </div>
  `;
}

/**
 * Simple markdown to HTML converter
 */
function convertMarkdown(markdown) {
  if (!markdown) return '';
  
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    
    // Bold and italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    // Code
    .replace(/`([^`]+)`/g, '<code style="background: rgba(58, 175, 169, 0.1); padding: 0.2em 0.4em; border-radius: 4px; font-family: var(--font-mono); font-size: 0.9em;">$1</code>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    
    // Lists
    .replace(/^\s*-\s+(.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    
    // Checkboxes
    .replace(/- \[ \] (.+)$/gim, '<li style="list-style: none; margin-left: -1rem;"><span style="color: var(--text-secondary);">☐</span> $1</li>')
    .replace(/- \[x\] (.+)$/gim, '<li style="list-style: none; margin-left: -1rem;"><span style="color: var(--accent);">☑</span> $1</li>')
    
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gim, '<p>$1</p>');
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>.*?<\/ul>)<\/p>/gs, '$1');
  html = html.replace(/<p>(<li>.*?<\/li>)<\/p>/gs, '$1');
  
  return html;
}

/**
 * Show blog error
 */
function showBlogError(message) {
  const container = document.getElementById('blog-post') || document.getElementById('blog-list');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 2rem;">
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${message}</p>
        <a href="../blog.html" class="btn btn-secondary">Back to Blog</a>
      </div>
    `;
  }
}
