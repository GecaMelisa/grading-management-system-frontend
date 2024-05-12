import React from 'react';
import { Button } from '@mui/joy';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
      
        window.location.href = '/';
    };

    return (
        <div className="navbar">
            <Link to='/courses'><Button sx={{width: '100%'}} variant='solid' color='primary'>Courses</Button></Link>
            <Link to='/members'><Button sx={{width: '100%'}} variant='solid' color='primary'>Members</Button></Link>
            <Link to='/coursesProfessor'><Button sx={{width: '100%'}} variant='solid' color='primary'>Courses Prof.</Button></Link>
            <Link to='/coursesStudent'><Button sx={{width: '100%'}} variant='solid' color='primary'>My Courses</Button></Link>

            <div className='user-info'>
                <div className='user-name'>Tarik Maljanovic</div>
                <Button sx={{width: '100%', marginTop: '20px'}} variant='solid' color='primary' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
};

export default NavBar;
