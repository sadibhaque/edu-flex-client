import { useState } from "react";
import { Link } from "react-router";
import { BookOpenCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ui/ModeToggle";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/add-course", label: "Add Course" },
    { to: "/my-enrollments", label: "My Enrollments" },
    { to: "/instructors", label: "Instructors" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-10/12 items-center justify-between">
                {/* Logo - Always visible */}
                <Link href="/" className="flex items-center space-x-2">
                    <BookOpenCheck className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block">
                        EduFlex
                    </span>
                </Link>

                {/* Desktop Navigation Links - Centered */}
                <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Right-aligned Login/Profile */}
                <div className="hidden md:flex items-center space-x-2">
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <ModeToggle />
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full transition-all duration-300"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src="/placeholder.svg?height=32&width=32"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Jane Doe
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            jane.doe@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Manage Courses
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setIsLoggedIn(false)}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <ModeToggle />
                            <Button
                                asChild
                                variant="ghost"
                                className="transition-all duration-300"
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="transition-all duration-300"
                            >
                                <Link href="/register">Register</Link>
                            </Button>
                        </nav>
                    )}
                </div>

                {/* Mobile Right-aligned group: Login/Profile + Menu Toggle */}
                <div className="flex items-center space-x-2 md:hidden">
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full transition-all duration-300"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src="/placeholder.svg?height=32&width=32"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            Jane Doe
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            jane.doe@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Manage Courses
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => setIsLoggedIn(false)}
                                >
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <Button
                                asChild
                                variant="ghost"
                                className="transition-all duration-300"
                            >
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="transition-all duration-300"
                            >
                                <Link href="/register">Register</Link>
                            </Button>
                        </nav>
                    )}
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="ml-2"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Content */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-background shadow-md md:hidden">
                        <nav className="flex flex-col space-y-2 p-4 items-end">
                            <div className="mx-auto">
                                <ModeToggle />
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="rounded-md mx-auto px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
