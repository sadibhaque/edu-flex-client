import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import { use } from "react";
import useAxios from "../hooks/useAxios";
motion;


export default function AddCourse() {
    const axiosSecure = useAxios();
    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        imageUrl: "",
        duration: "",
        date: new Date().toLocaleDateString(),
        added: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const { user } = use(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const userEmail = user.email;

        const courseData = {
            ...formData,
            email: userEmail,
        };
        axiosSecure
            .post(`/add-course`, courseData)
            .then(() => {
                toast.success("Course added successfully!");
            })
            .catch((error) => {
                console.error("Error adding course:", error);
            });

        // Reset form
        // setFormData({
        //     title: "",
        //     shortDescription: "",
        //     imageUrl: "",
        //     duration: "",
        // });
        setIsSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center min-h-[calc(100vh-15rem)] py-12 px-4"
        >
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Add New Course</CardTitle>
                    <CardDescription>
                        Fill in the details below to add a new course to the
                        platform.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Advanced React Hooks"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="shortDescription">
                                Short Description
                            </Label>
                            <Textarea
                                id="shortDescription"
                                placeholder="A brief overview of the course content."
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                type="url"
                                placeholder="https://example.com/course-image.jpg"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duration">
                                Duration (e.g., 10 hours, 4 weeks)
                            </Label>
                            <Input
                                id="duration"
                                placeholder="e.g., 10 hours"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full transition-all duration-300"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Adding Course..." : "Add Course"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
