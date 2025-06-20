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
import { FaGithub, FaGoogle } from "react-icons/fa";

export function Register() {
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
                    <form>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="text">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
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
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div className="flex gap-2 w-full mt-3">
                        <Button variant="outline" className="w-1/2">
                            <FaGoogle />
                        </Button>
                        <Button variant="outline" className="w-1/2">
                            <FaGithub />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
