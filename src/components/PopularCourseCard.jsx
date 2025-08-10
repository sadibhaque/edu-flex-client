import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ArrowRight,
    Calendar,
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FaFire } from "react-icons/fa";

function PopularCourseCard({ course }) {
    return (
        <Card className="border-none overflow-hidden py-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30 flex h-full flex-col">
            <CardHeader className="p-0">
                <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-50 w-full object-cover"
                />
            </CardHeader>
            <CardContent className="p-4 flex-1">
                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Added on {course.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                    <FaFire className="h-4 w-4 mr-2 text-red-500" />
                    <span>Sold {course.added}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <Button
                    asChild
                    className="w-full text-white transition-all duration-300"
                >
                    <Link to={`/courses/${course._id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default PopularCourseCard;
