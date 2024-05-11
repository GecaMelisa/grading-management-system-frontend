import './courseListStudent.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Table from '@mui/joy/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function CourseListStudent(props) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const studentIdFromLocalStorage = localStorage.getItem("studentId");
        
        if (studentIdFromLocalStorage) {
            console.log("Student ID from localStorage:", studentIdFromLocalStorage); // Dodajte ovu liniju

            axios.get(`http://localhost/grading-management-system/api/studentcourses/${studentIdFromLocalStorage}`)
            .then(res => {
                    setCourses(res.data);
                    console.log(res.data); 
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
    }, []);
    

    const handleCourseClick = (courseId) => {
        setSelectedCourse(courseId);
        axios.get(`http://localhost/grading-management-system/api/assignmentGrades/${courseId}/${assingmentId}/${studentIdFromLocalStorage}`)
            .then(res => {
                setGrades(res.data);
            })
            .catch(error => {
                console.error('Error fetching grades for course:', error);
            });
    };

    return (
        <>
            <div className="course-list">
                <h2>My Courses</h2>
                <div className="course-cards">
                    {courses.map(course => (
                        <div key={course.id} onClick={() => handleCourseClick(course.id)} className="course-card">
                            <span className='course-code'>{course.courseCode}</span>
                            <span className='course-code'>{course.ects} ECTS</span>
                            <p className='course-title'>{course.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Modal open={selectedCourse !== null} onClose={() => setSelectedCourse(null)}>
                <ModalDialog sx={{ overflow: 'scroll' }}>
                    <DialogTitle>{selectedCourse ? `Grades for Course ${selectedCourse}` : 'Grades'}</DialogTitle>
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Assignment Title</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {grades.map(grade => (
                                        <TableRow key={grade.assignmentId}>
                                            <TableCell>{grade.assignmentTitle}</TableCell>
                                            <TableCell>{grade.grade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </>
    );
}
