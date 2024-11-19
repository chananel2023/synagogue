import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAdmin() {
    return (
        <nav style={{
            backgroundColor: '#333',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <ul style={{
                display: 'flex',
                listStyleType: 'none',
                margin: 0,
                padding: 0
            }}>


                <li style={{ marginRight: '1rem' }}>
                    <Link to="/homePage" style={linkStyle}> דף הבית משתמשים</Link>
                </li>

                <li style={{ marginRight: '1rem' }}>
                    <Link to="/payAdmin" style={linkStyle}>תשלומים</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/tfilotAdmin" style={linkStyle}>הגדרת זמני תפילה</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/messageAdmin" style={linkStyle}>עדכונים חמים</Link>
                </li>

            </ul>
        </nav>
    );
}

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: 'color 0.3s',
    hover: {
        color: '#00bfff'
    }
};

export default NavbarAdmin;
