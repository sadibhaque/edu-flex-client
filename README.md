# EduFlex

<img src="https://i.ibb.co.com/hJ8CfP3L/image.png" alt="Banner" style="width:100%;"/>

EduFlex is a modern, responsive learning platform built with React and Vite that allows users to browse, enroll, and manage online courses.

**Live Demo:** https://the-edu-flex.netlify.app/

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

---

## 🛠️ Getting Started

1. Clone the Repository

    ```bash
    git clone https://github.com/sadibhaque/edu-flex-client.git
    ```

2. Install dependencies:

    ```bash
    cd edu-flex-client
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```
