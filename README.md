# Kartikeya Arora - Academic Portfolio Website

A modern, responsive academic portfolio website for a PhD student in Electrical Engineering at USC specializing in quantum computing theory.

## Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **USC Branding**: Uses official USC colors (Cardinal Red #990000, Gold #FFCC00)
- **SEO Optimized**: Complete meta tags, structured data, and performance optimization
- **Professional Sections**: Home, About, Research, Publications, Tutorials, Contact
- **Social Integration**: Links to Google Scholar, GitHub, LinkedIn, ORCID
- **Modern UI/UX**: Clean design with smooth animations and interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Hosting**: GitHub Pages
- **Fonts**: Google Fonts (Inter)
- **Icons**: Font Awesome
- **Build Tool**: Jekyll (GitHub Pages default)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arora-kartikeya/arora-kartikeya.github.io.git
   cd arora-kartikeya.github.io
   ```

2. **Customize content**:
   - Update personal information in `index.html`
   - Replace placeholder images in `assets/` folder
   - Update social media links with your actual profiles
   - Modify research interests and publications

3. **Add your content**:
   - Add your profile photo as `assets/profile.jpg`
   - Add your CV as `assets/cv.pdf`
   - Create favicon and save as `assets/favicon.ico`

4. **Deploy to GitHub Pages**:
   - Push your changes to the `main` branch
   - Enable GitHub Pages in repository settings
   - Your site will be available at `https://arora-kartikeya.github.io`

## Customization Guide

### Colors
USC theme colors are defined in CSS variables in `css/style.css`:
```css
:root {
    --usc-cardinal: #990000;
    --usc-gold: #FFCC00;
    /* ... other colors */
}
```

### Content Sections
- **Hero Section**: Update name, title, and description
- **About Section**: Modify bio, education, and research interests
- **Research Section**: Update research areas and descriptions
- **Publications**: Add your actual publications
- **Contact**: Update contact information and office details

### Social Media Links
Update the following in `index.html`:
- Google Scholar: Replace `YOUR_ID` with your Google Scholar user ID
- LinkedIn: Replace `YOUR_PROFILE` with your LinkedIn username
- ORCID: Replace `YOUR_ORCID` with your ORCID identifier
- GitHub: Should already point to your GitHub username

## File Structure

```
├── index.html              # Main homepage
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # JavaScript functionality
├── assets/
│   ├── profile.jpg        # Your profile photo
│   ├── cv.pdf            # Your CV/Resume
│   └── favicon.ico       # Website icon
├── _config.yml           # Jekyll configuration
└── README.md            # This file
```

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Optimized CSS**: Minified and efficient stylesheets
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Mobile-First**: Responsive design principles
- **SEO Optimized**: Meta tags, structured data, sitemap

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode support
- Reduced motion support for accessibility preferences

## SEO Features

- Comprehensive meta tags
- Open Graph and Twitter Card support
- Structured data (JSON-LD)
- Optimized page titles and descriptions
- XML sitemap generation
- Canonical URLs

## Contributing

This is a personal portfolio website. If you find bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions about this website template or collaboration opportunities:

- **Email**: kartikeya@usc.edu
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [@arora-kartikeya](https://github.com/arora-kartikeya)

---

**Note**: Remember to update all placeholder content with your actual information before going live!
