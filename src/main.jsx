import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router/Router.jsx';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from './provider/ThemeProvider.jsx';
import { Toaster } from "@/components/ui/sonner"
import AuthProvider from './provider/AuthProvider.jsx';


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <RouterProvider router={router} />
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
