import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
                    <Link to="/login" style={linkStyle}>Login</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/signupForm" style={linkStyle}>Signup</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/HomePage" style={linkStyle}>HomePage</Link>
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

export default Navbar;
