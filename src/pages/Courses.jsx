import NavBar from "../components/NavBar/NavBar"
import CourseList from "../components/CourseList/CourseList"
import '../styles/courses.css'
import { Button } from "@mui/joy"
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [teachers, setTeachers] = useState([])
    const [courseData, setCourseData] = useState({
        title: '',
        courseCode: '',
        description: '',
        ects: '',
        professor_id: ''
    })

    useEffect(() => {
        axios.get('https://king-prawn-app-66oof.ondigitalocean.app/api/courses').then(res => {
            setCourses(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('https://king-prawn-app-66oof.ondigitalocean.app/api/professors').then(res => {
            setTeachers(res.data)
        })
    }, [])

    const handleAddCourse = () => {
        axios.post('https://king-prawn-app-66oof.ondigitalocean.app/api/courses', courseData).then(res => {
            setCourses([...courses, res.data])
        })
    }

    return (
        <div className="main">
            <NavBar />
            <div className="courses-section">
                <Button onClick={() => setOpen(true)} sx={{margin: '10px'}} startDecorator={<AddIcon />} variant='solid' color='primary'>Add Course</Button>
                <CourseList courses={courses} teachers={teachers} />
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                <DialogTitle>Create a new Course</DialogTitle>
                <DialogContent>Fill in the information of the Course.</DialogContent>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setOpen(false);
                        handleAddCourse();
                    }}
                >
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Course Name</FormLabel>
                            <Input onChange={(e) => setCourseData({...courseData, title: e.target.value})} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Course Code</FormLabel>
                            <Input onChange={(e) => setCourseData({...courseData, courseCode: e.target.value})} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input onChange={(e) => setCourseData({...courseData, description: e.target.value})} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>ECTS</FormLabel>
                            <Input onChange={(e) => setCourseData({...courseData, ects: e.target.value})} type="number" required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Teacher</FormLabel>
                            <Select onChange={(e, v) => setCourseData({...courseData, professor_id: v})} defaultValue="1">
                                {
                                    teachers.map(teacher => {
                                        return (
                                            <Option key={teacher.id} value={teacher.id}>{teacher.firstName} {teacher.lastName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <Button type="submit">Create</Button>
                    </Stack>
                </form>
                </ModalDialog>
            </Modal>
        </div>
    )
}