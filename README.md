# EduFlex

EduFlex is a modern, responsive learning platform built with React and Vite that allows users to browse, enroll, and manage online courses.

**Live Demo:** https://sadib-assignment-11-ph.netlify.app/

## Purpose

This project serves as a full-stack education portal where instructors can add courses and students can explore, enroll, and keep track of their learning progress. It demonstrates secure authentication, dynamic course management, and real-time data updates.

## Key Features

-   User authentication and authorization via Firebase
-   Browse all courses, view details, and search by popularity or recency
-   Real-time enroll and unenroll functionality with MongoDB backend
-   Increment and decrement course view or enrollment count via secure REST API
-   Responsive navigation with active-link highlighting
-   Image slider on the homepage with custom navigation arrows
-   Animated UI components using Framer Motion
-   Light and dark theme toggle

## Tech Stack & NPM Packages

-   React & Vite
-   Tailwind CSS & `@tailwindcss/vite`
-   Firebase Authentication (`firebase`)
-   Axios for HTTP requests (`axios`)
-   React Router (`react-router`)
-   MongoDB & Node.js Express js (server)
-   Data fetching & hooks (`useAxios`, `useAuth`)
-   Slideshow: `react-slick`, `slick-carousel`
-   Animations: `framer-motion` & `motion`
-   Icons: `lucide-react`, `react-icons`
-   UI components: `shadcn`,react-dropdown-menu`, etc.
-   Notifications: `sonner`

## Getting Started

1. Clone the repo and install dependencies:

    ```bash
    cd edu-flex-client
    npm install
    ```

2. Start the development server:

    ```bash
    npm run dev
    ```

## Server

The backend API is hosted separately at `https://eduflex-server.vercel.app`. It manages courses and enrollments using Express and MongoDB.

### 1. Clone the Repositories

```bash
# Client-side
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-sadibhaque

# Server-side
git clone https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-sadibhaque
```
