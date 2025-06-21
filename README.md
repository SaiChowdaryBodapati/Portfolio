# Brick-Themed Portfolio

A modern, responsive, and customizable portfolio website with a unique brick/gaming aesthetic. Built with React, TypeScript, Vite, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
  - [Theme](#theme)
  - [Content](#content)
  - [Resume](#resume)
- [Deployment](#deployment)
- [License](#license)

## Features

- **Modern Tech Stack**: React, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Looks great on all devices, from mobile to desktop.
- **Customizable**: Easily change the theme, content, and resume.
- **Dark Mode**: Sleek, modern dark theme.
- **Interactive Elements**: Engaging animations and hover effects.
- **Contact Form**: Functional contact form with EmailJS integration.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

## Customization

### Theme

The theme can be customized in `tailwind.config.ts` and `src/index.css`.

### Content

All content is managed within the `src/components` directory. You can update the text, images, and links in the following files:

- `HeroSection.tsx`
- `AboutSection.tsx`
- `SkillsSection.tsx`
- `ExperienceSection.tsx`
- `ProjectsSection.tsx`
- `ContactSection.tsx`

### Resume

To add your resume, place your `resume.pdf` file in the `public` directory.

## Deployment

This project can be deployed to any static site hosting service, such as Netlify, Vercel, or GitHub Pages.

1.  **Build for production:**
    ```bash
    npm run build
    ```

2.  **Deploy the `dist` directory.**

## License

This project is licensed under the MIT License.
