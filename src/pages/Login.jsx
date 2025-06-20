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
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from '../provider/AuthProvider';


export function Login() {
    const { loginUser, loginWithGoogle, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                navigate(`${location.state ? location.state : "/"}`);
                // toast.success("Login successful");
            })
            .catch((error) => {
                // toast.error(error.message);
                console.log(error.message);
            });
    };
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                setUser(result.user);
                // toast.success("Login successful");
                navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
                // toast.error(error.message);
                console.error(error);
            });
    };

    return (
        <div className="my-20">
            <Card className="w-full max-w-sm mx-auto">
                <h2 className="text-3xl text-center text-primary font-bold">
                    Login
                </h2>
                <hr className="w-[65%] mx-auto" />
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div className="flex gap-2 w-full mt-3">
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
