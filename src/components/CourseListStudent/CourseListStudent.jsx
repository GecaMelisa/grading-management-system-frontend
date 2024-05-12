import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [assignments, setAssignments] = useState([]);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        const studentIdFromLocalStorage = localStorage.getItem("userId");
        
        if (studentIdFromLocalStorage) {
            axios.get(`http://localhost/grading-management-system/api/studentcourses/${studentIdFromLocalStorage}`)
                .then(res => {
                    setCourses(res.data);
                })
                .catch(error => {
                    console.error('Error fetching student courses:', error);
                });
        }
    }, []);

    const handleCourseClick = (courseId) => {
        setSelectedCourse(courseId);
        axios.get(`http://localhost/grading-management-system/api/courses/1/assignments`)
            .then(res => {
                setAssignments(res.data);
            })
            .catch(error => {
                console.error('Error fetching assignments for course:', error);
            });
    };


    //Prikazuje ocjene iz assignment-a kad se klikne na ime assignment-a, treba promijeniti
    const handleAssignmentClick = (assignmentId) => {
            const studentIdFromLocalStorage = localStorage.getItem("userId");
            axios.get(`http://localhost/grading-management-system/api/assignmentGrades/1/${assignmentId}/${studentIdFromLocalStorage}`)
                .then(res => {
                    setGrades(res.data);
                })
                .catch(error => {
                    console.error('Error fetching grades for assignment:', error);
                });
        };

    return (
        <>
            <div className="course-list">
                <h2>My Courses</h2>
                <div className="course-cards">
                    {courses.map(course => (
                        <div key={course.id} onClick={() => handleCourseClick(course.id)} className="course-card" style={{ color: 'black' }}>
                        <span className='course-code'>{course.courseCode}</span>
                            <span className='course-code'>{course.ects} ECTS</span>
                            <p className='course-title'>{course.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Modal open={selectedCourse !== null} onClose={() => setSelectedCourse(null)}>
                <ModalDialog sx={{ overflow: 'scroll' }}>
                    <DialogTitle>{selectedCourse ? `Assignments for Course ${selectedCourse}` : 'Assignments'}</DialogTitle>
                    <DialogContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Assignment Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignments.map(assignment => (
                                        <TableRow key={assignment.id} onClick={() => handleAssignmentClick(assignment.id)}>
                                            <TableCell>{assignment.title}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                </ModalDialog>
            </Modal>

            <Modal open={grades.length > 0} onClose={() => setGrades([])}>
                <ModalDialog sx={{ overflow: 'scroll' }}>
                    <DialogTitle>{`Grades for Course ${selectedCourse}`}</DialogTitle>
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