# Talha Bin Najaf Malik - Portfolio

A clean, aerospace-themed personal portfolio website designed for GitHub Pages deployment.

![Aerospace Theme](https://img.shields.io/badge/theme-aerospace-3AAFA9)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Aerospace/Mission Control Aesthetic**: Dark theme with subtle gridlines, starfield, and clean avionics-style panels
- **Multi-page Structure**: Home, Projects, Experience, Blog, Contact
- **Responsive Design**: Works on desktop, tablet, and mobile
- **No-scroll Desktop Design**: Each page fits one screen on desktop
- **Data-driven**: Projects and blog posts loaded from JSON files
- **Accessible**: Keyboard navigation, proper headings, good contrast
- **Fast & Lightweight**: Pure HTML/CSS/JS with minimal dependencies

## Project Structure

```
/
├── index.html              # Home page
├── projects.html           # Projects marketplace grid
├── experience.html         # Work experience timeline
├── blog.html              # Blog listing
├── contact.html           # Contact page
├── project/               # Individual project pages
│   ├── gemini-hybrid-uav-ugv.html
│   ├── gps-denied-rover.html
│   ├── hil-test-rig.html
│   ├── wind-aware-planner.html
│   ├── imitation-learning-stack.html
│   └── fault-tolerant-ekf.html
├── blog/                  # Individual blog posts
│   ├── fault-tolerant-ekf-design.html
│   ├── sil-to-flight-checklist.html
│   ├── tuning-mpc-wind.html
│   └── rover-imitation-learning.html
├── css/
│   └── styles.css         # Main stylesheet
├── js/
│   ├── main.js            # Shared functionality
│   ├── projects.js        # Projects marketplace
│   ├── project.js         # Individual project pages
│   └── blog.js            # Blog functionality
├── data/
│   ├── profile.json       # Personal info
│   ├── projects.json      # Project data
│   └── posts.json         # Blog posts
├── assets/
│   ├── profile.jpg        # Your photo
│   ├── Talha_Malik_Resume.pdf  # Your resume
│   └── projects/          # Project images
└── README.md              # This file
```

## Quick Start

### Local Development

Run a simple local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. **Create a new repository** on GitHub
2. **Push this code** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Click Save
4. **Wait a few minutes** and your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Deploy to Subpath

If you're deploying to `https://username.github.io/repo-name/`, the site will work automatically with relative paths.

## Customization

### Update Personal Information

Edit `data/profile.json`:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "email": "your.email@example.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername"
}
```

### Update Projects

Edit `data/projects.json` to add/remove projects. Each project needs:

```json
{
  "slug": "project-name",
  "title": "Project Title",
  "summary": "One-line description",
  "thumbnail": "assets/projects/image.jpg",
  "banner": "assets/projects/banner.jpg",
  "tags": ["Tag1", "Tag2"],
  "category": "UAV",
  "date": "2024",
  "role": "Your Role",
  "highlights": ["Achievement 1", "Achievement 2"],
  "tech_stack": ["Tech1", "Tech2"],
  "challenges": "Description of challenges",
  "improvements": "Future improvements",
  "links": {
    "github": "https://github.com/...",
    "demo": "https://...",
    "video": "https://youtube.com/...",
    "report": "assets/projects/report.pdf"
  }
}
```

Then create a new HTML file in `project/` folder with the slug name.

### Update Blog Posts

Edit `data/posts.json` to add blog posts:

```json
{
  "slug": "post-name",
  "title": "Post Title",
  "excerpt": "Short description",
  "date": "2024-01-15",
  "category": "Controls",
  "readTime": "5 min read",
  "image": "assets/blog/image.jpg",
  "content": "Post content in markdown..."
}
```

Then create a new HTML file in `blog/` folder with the slug name.

### Add Your Photo

Replace `assets/profile.jpg` with your professional photo. Recommended:
- Aspect ratio: 4:5
- Minimum size: 800x1000px
- The CSS applies a subtle grayscale + contrast filter

### Add Your Resume

Replace `assets/Talha_Malik_Resume.pdf` with your resume PDF.

### Add Project Images

Add project thumbnails and banners to `assets/projects/`:
- Thumbnails: 4:5 aspect ratio, ~800x1000px
- Banners: 21:9 aspect ratio, ~1920x820px

The CSS applies a cool teal-grade filter to all images.

## Styling

### Colors

- **Background Primary**: `#0B0F17` (deep navy-black)
- **Background Secondary**: `#121A25` (slightly lighter navy)
- **Accent**: `#3AAFA9` (teal/cyan)
- **Text Primary**: `#F4F6F8` (near-white)
- **Text Secondary**: `#A7B1BE` (cool gray)

### Typography

- **Headings**: Space Grotesk
- **Body**: Inter
- **Labels/Mono**: IBM Plex Mono

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external JavaScript frameworks
- Minimal CSS (single file)
- Images lazy-loaded
- Fonts loaded via Google Fonts with `display=swap`

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- `prefers-reduced-motion` support
- Good color contrast ratios

## License

MIT License - feel free to use this template for your own portfolio.

## Credits

Designed and built for Talha Bin Najaf Malik.
