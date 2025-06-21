# How to Add Your Profile Image

This guide will walk you through adding your personal profile image to the portfolio.

## 1. Prepare Your Image

-   **Choose a professional photo**: A clear headshot works best.
-   **Name the file**: Rename your image file to `profile.jpg` (or `.png`).
-   **Image format**: Use a common web format like `.jpg`, `.png`, or `.webp`.

## 2. Add the Image to the Project

1.  Locate the `public` folder in the project directory. This folder is at the root of your project:
    `brick-themed-main/public/`
2.  Drag and drop your `profile.jpg` file into this `public` folder.

## 3. Update the Image Path in the Code

1.  Open the `HeroSection.tsx` file located at:
    `brick-themed-main/src/components/HeroSection.tsx`
2.  Find the `heroData` object inside the component.
3.  Change the `image` property from the placeholder to your new image file:

    ```typescript
    const heroData = {
      // ... other properties
      image: '/profile.jpg' // Change this line
    };
    ```

    Make sure the path starts with a `/`, which tells the browser to look for it in the `public` folder.

## That's it!

Once you save the file, the website will update with your new profile picture. 