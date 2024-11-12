import React from 'react';
import NavbarAdmin from '../components/navBarAdmin';

const HomePageAdmin: React.FC = () => {
    return (
        <div>
            <NavbarAdmin />
            <div className="content">
                <h1>ברוך הבא לאזור הניהול</h1>
                <p>כאן ניתן לנהל את התוכן של האתר שלך.</p>
            </div>
        </div>
    );
};

export default HomePageAdmin;
