import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { use, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export function Register() {
    const location = useLocation();
    const Navigate = useNavigate();
    const { createUser, updateUser, setUser, user, loginWithGoogle } =
        use(AuthContext);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    if (user) {
        return navigate("/");
    }
    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const url = e.target.url.value;
        const password = e.target.password.value;
        const password1 = e.target.password1.value;

        let err = passwordError;
        if (password.length < 6)
            err = "Password must be at least 6 characters.";
        else if (password !== password1) err = "Passwords do not match.";
        else if (!/[A-Z]/.test(password))
            err = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(password))
            err = "Password must contain at least one lowercase letter.";
        if (err) {
            setPasswordError(err);
            toast.error(err);

            return;
        } else {
            setPasswordError("");
        }

        createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUser({ displayName: name, photoURL: url }).then(() => {
                    setUser({
                        ...user,
                        displayName: name,
                        photoURL: url,
                    });
                    toast.success("Registration successful");
                    // logoutUser();
                    navigate(`${location.state ? location.state : "/"}`);
                });
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error.message);
            });
    };

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                setUser(result.user);
                toast.success("Login successful");
                navigate(location.state || "/");
            })
            .catch((error) => {
                toast.error(error.message);
                console.error(error);
            });
    };
    return (
        <div className="my-20">
            <Card className="w-full max-w-sm mx-auto">
                <h2 className="text-3xl text-center text-primary font-bold">
                    Register
                </h2>
                <hr className="w-[65%] mx-auto" />
                <CardHeader>
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Enter your credentials below to register your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Login</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="text">Name</Label>
                                <Input
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="text">Photo URL</Label>
                                <Input
                                    name="url"
                                    type="text"
                                    placeholder="www.example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    name="password"
                                    type="password"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        Confirm Password
                                    </Label>
                                </div>
                                <Input
                                    name="password1"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="mt-4 w-full">
                            Register
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2" onClick={handleGoogleLogin}>
                            <Button variant="outline" className="w-full">
                                <FaGoogle />
                            </Button>
                        </div>
                        <Button variant="outline" className="w-1/2">
                            <FaGithub />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
