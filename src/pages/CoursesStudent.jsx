import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import CourseListStudent from "../components/CourseListStudent/CourseListStudent";

export default function CoursesStudent() {
    const [courses, setCourses] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
    const [assignmentGrades, setAssignmentGrades] = useState([]);

    const studentIdFromLocalStorage = localStorage.getItem("userId");
    console.log(studentIdFromLocalStorage)
 
    useEffect(() => {
        if (studentIdFromLocalStorage) {
            console.log("Student ID from localStorage:", studentIdFromLocalStorage); 

            axios.get(`https://king-prawn-app-66oof.ondigitalocean.app/api/studentcourses/${studentIdFromLocalStorage}`)
                .then(res => {
                    setCourses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
    }, []);

    console.log(courses);

    return (
        <div className="main">
            <NavBar />
            <div className="courses-section">
                <h1>My Courses</h1>
                <CourseListStudent
                    courses={courses}
                    studentId={studentId}
                    setSelectedCourseId={setSelectedCourseId}
                    setSelectedAssignmentId={setSelectedAssignmentId}
                    setAssignmentGrades={setAssignmentGrades}
                />
                {assignmentGrades.length > 0 && (
                    <div>
                        <h2>Assignment Grades</h2>
                        <ul>
                            {assignmentGrades.map(grade => (
                                <li key={grade.id}>{grade.grade}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
