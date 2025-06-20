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

function CourseCard({ course }) {
    return (
        <Card className="overflow-hidden py-0 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10">
            <CardHeader className="p-0">
                <img
                    // src={course.image || "/placeholder.svg"}
                    src="https://i.ibb.co/DDcpNXBf/image.png"
                    alt={course.title}
                    className="h-50 w-full object-cover"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Added on {course.date}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full transition-all duration-300">
                    <Link href={`/courses/${course.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CourseCard;
