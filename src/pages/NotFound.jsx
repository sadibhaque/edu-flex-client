import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Compass, Home, BookOpen } from "lucide-react";
motion;

export default function NotFound() {
    useEffect(() => {
        document.title = "404 - Page Not Found | EduFlex";
    }, []);

    return (
        <div className="relative isolate min-h-screen">
            {/* Soft background accents */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
            </div>

            <div className="container mx-auto px-5 lg:px-0 py-20 min-h-[calc(100vh-15rem)] grid place-items-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center max-w-2xl"
                >
                    <div className="inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
                        <Compass className="h-4 w-4 mr-2 text-primary" />
                        Oops! We couldn't find that page
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                        404
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl font-semibold">
                        Page Not Found
                    </p>
                    <p className="mt-3 text-muted-foreground">
                        The page you’re looking for doesn’t exist or has been
                        moved. Try heading back home or explore our latest
                        courses.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="w-full sm:w-auto text-white"
                        >
                            <Link to="/">
                                <Home className="h-5 w-5 mr-2" /> Go Home
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                        >
                            <Link to="/courses">
                                <BookOpen className="h-5 w-5 mr-2" /> Browse
                                Courses
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
