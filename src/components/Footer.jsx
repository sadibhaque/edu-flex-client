import { Link } from "react-router";
import { BookOpenCheck, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-border/40">
            <div className="container mx-auto grid max-w-10/12 grid-cols-1 gap-8 py-12 md:grid-cols-3">
                <div className="flex flex-col items-start">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                        <BookOpenCheck className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">EduFlex</span>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                        Empowering minds through accessible and quality online
                        education.
                    </p>
                    <div className="mt-6 flex space-x-4">
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-primary"
                        >
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
                    <div>
                        <h3 className="font-semibold tracking-wider">
                            Platform
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="/courses"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Browse Courses
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/instructors"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Our Instructors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold tracking-wider">
                            Resources
                        </h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Partnerships
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <h3 className="font-semibold tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border-t border-border/40 py-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} EduFlex, Inc. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
