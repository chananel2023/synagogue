import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment'; // אייקון תשלומים
import SchoolIcon from '@mui/icons-material/School'; // אייקון שיעורים
import MessageIcon from '@mui/icons-material/Message'; // אייקון עדכונים חמים
import CarouselIcon from '@mui/icons-material/Slideshow'; // אייקון קרוסלה

function NavbarAdmin() {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleMouseEnter = (index: number) => setHoverIndex(index);
    const handleMouseLeave = () => setHoverIndex(null);
    const handleNavigate = (link: string) => {
        navigate(link);
    };

    return (
        <div style={dashboardContainer}>
            {menuItems.map((item, index) => (
                <div
                    key={index}
                    style={{
                        ...dashboardItem,
                        ...(hoverIndex === index ? dashboardItemHover : {}),
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleNavigate(item.link)}
                >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.icon}
                        <span
                            style={{
                                ...linkStyle,
                                fontSize: hoverIndex === index ? '1.5rem' : '1.2rem', // שינוי גודל הפונט
                                marginLeft: '8px', // רווח בין האייקון לטקסט
                            }}
                        >
                            {item.label}
                        </span>
                    </span>
                </div>
            ))}
        </div>
    );
}

// רשימת פריטים עם אייקונים
const menuItems = [
    { label: 'תשלומים', link: '/payAdmin', icon: <PaymentIcon /> },
    { label: 'תפילות', link: '/tfilotAdmin', icon: <SchoolIcon /> },
    { label: 'עדכונים חמים', link: '/messageAdmin', icon: <MessageIcon /> },
    { label: 'שיעורים', link: '/Lessons', icon: <SchoolIcon /> },
    { label: 'קרוסלה', link: '/UpdataAdminCarousel', icon: <CarouselIcon /> },
];

// עיצוב הדשבורד הכללי
const dashboardContainer: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

// עיצוב של כל כפתור/קובייה
const dashboardItem: CSSProperties = {
    backgroundColor: '#4A90E2', // צבע רקע כחול מודרני
    color: '#FFFFFF',
    width: '200px',
    height: '200px',
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // שינוי כל המאפיינים בצורה חלקה
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
};

// אפקט hover
const dashboardItemHover: CSSProperties = {
    transform: 'scale(1.05)', // הגדלה קלה כאשר הכרטיס מוחזק
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
};

// עיצוב הטקסט בתוך הקישורים
const linkStyle: CSSProperties = {
    color: '#FFFFFF',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'font-size 0.3s ease',
};

// ייצוא הקומפוננטה
export default NavbarAdmin;