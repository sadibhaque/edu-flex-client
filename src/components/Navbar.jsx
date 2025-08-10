import { use, useState } from "react";
import { Link, NavLink } from "react-router";
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
import { AuthContext } from "../provider/AuthProvider";

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/add-course", label: "Add Course" },
    { to: "/my-enrollments", label: "My Enrollments" },
    { to: "/my-courses", label: "My Courses" },
];

export default function Navbar() {
    const { user, logoutUser } = use(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Filter out private-only links when logged out
    const visibleLinks = user
        ? navLinks
        : navLinks.filter(
              (l) => l.to !== "/my-enrollments" && l.to !== "/my-courses"
          );

    const handleLogout = (e) => {
        e.preventDefault();

        logoutUser()
            .then(() => {
                console.log("Successfully Signed Out!");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b lg:px-4 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-14 max-w-10/12 items-center justify-between">
                {/* Logo - Always visible */}
                <Link to="/" className="flex items-center space-x-2">
                    <BookOpenCheck className="h-6 w-6 text-primary" />
                    <span className="hidden font-bold sm:inline-block">
                        EduFlex
                    </span>
                </Link>

                {/* Desktop Navigation Links - Centered */}
                <nav className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm">
                    {visibleLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `transition-colors hover:text-foreground/80 ${
                                    isActive
                                        ? "underline underline-offset-4 text-foreground"
                                        : "text-foreground/60"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop Right-aligned Login/Profile */}
                <div className="hidden md:flex items-center space-x-2">
                    {user ? (
                        <DropdownMenu>
                            <ModeToggle />
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full transition-all duration-300"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={
                                                user.photoURL ||
                                                "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
                                            }
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
                                            {user.displayName}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Manage Courses
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
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
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="transition-all text-white duration-300"
                            >
                                <Link to="/register">Register</Link>
                            </Button>
                        </nav>
                    )}
                </div>

                {/* Mobile Right-aligned group: Login/Profile + Menu Toggle */}
                <div className="flex items-center space-x-2 md:hidden">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full transition-all duration-300"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={
                                                user.photoURL ||
                                                "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg"
                                            }
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
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <nav className="flex items-center gap-2">
                            <Button
                                asChild
                                variant="ghost"
                                className="transition-all duration-300"
                            >
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button
                                asChild
                                className="transition-all duration-300"
                            >
                                <Link to="/register">Register</Link>
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
                            {visibleLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `rounded-md mx-auto px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                                            isActive
                                                ? "underline underline-offset-4"
                                                : ""
                                        }`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
