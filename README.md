# Abdulfattah Opeyemi Atotileto | Student Portfolio

A responsive personal portfolio featuring academic results, professional experience, selected projects and an interactive study planner. Built with HTML, CSS and JavaScript; no build step or package installation is required.

## Open the website

Open `index.html` in a modern browser, or serve this folder locally with VS Code Live Server or `python -m http.server 8000` and visit `http://localhost:8000`.

## Host on GitHub Pages

This repository is configured to publish the site automatically when changes are pushed to `main`.

1. Push the repository to GitHub.
2. In the repository, open **Settings → Pages** and set the build and deployment source to **GitHub Actions**.
3. Open the **Actions** tab and wait for the **Deploy static site to GitHub Pages** workflow to finish.

The site will be available at <https://hatotileto.github.io/abdulfattah-opeyemi-portfolio2/>. Future pushes to `main` will publish updates automatically. You can also start a deployment manually from the workflow’s **Run workflow** button.

## Pages

- **Home:** Personal introduction and featured Market Rush project.
- **About:** Education, experience, certifications, skills and achievements.
- **Academic record:** A blank 100 Level first-semester coursework simulator and current CGPA of 4.41.
- **Projects:** Market Rush and portfolio coursework features.
- **Planner:** Add, complete, filter and delete study tasks saved in this browser.
- **Contact:** Validates the contact form and prepares an email in the visitor’s email application.

## Academic results

The Academic Record page displays the current CGPA of 4.41 and provides blank editable rows for entering first-semester courses. The coursework simulator estimates semester GPA from course details entered by the visitor.

## Notes

- Planner entries are stored locally in the browser and do not sync across devices.
- The contact form has no server-side delivery; it opens the visitor’s configured email application.
- The profile image in `assets/profile.jpg` is an illustration.
- Google Fonts are loaded externally when available; system font fallbacks are included.

## Files

`index.html`, `about.html`, `academic.html`, `projects.html`, `planner.html`, `contact.html`, `style.css`, `script.js` and `assets/`.