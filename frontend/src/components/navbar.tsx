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
                <h2>ל</h2>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/login" style={linkStyle}>יציאה</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/zmanim" style={linkStyle}>זמני היום</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/Signup" style={linkStyle}>יצירת חשבון</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/HomePage" style={linkStyle}>דף הבית</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/private" style={linkStyle}>איזור אישי</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                    <Link to="/pay" style={linkStyle}>תשלומים</Link>
                </li>
                <li style={{ marginRight: '1rem' }}>
                <Link to="/contact" style={linkStyle}>צור קשר</Link>
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
