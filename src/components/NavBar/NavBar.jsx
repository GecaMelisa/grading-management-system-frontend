import './navbar.css'
import { Button } from '@mui/joy'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <div className="navbar">
            <Link to='/courses'><Button sx={{width: '100%'}} variant='solid' color='primary'>Courses</Button></Link>
            <Link to='/members'><Button sx={{width: '100%'}} variant='solid' color='primary'>Members</Button></Link>
            <div className='user-info'>
                <div className='user-name'>Tarik Maljanovic</div>
                <Link to='/'><Button sx={{width: '100%', marginTop: '20px'}} variant='solid' color='primary'>Logout</Button></Link>
            </div>
        </div>
    )
}