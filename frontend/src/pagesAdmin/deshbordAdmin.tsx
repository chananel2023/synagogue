import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom'; // שימוש ב- useNavigate מ-react-router-dom

function NavbarAdmin() {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleMouseEnter = (index: number) => setHoverIndex(index);
    const handleMouseLeave = () => setHoverIndex(null);

    const handleNavigate = (link: string) => {
        navigate(link); // ניווט לכתובת הקישור
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
                    onClick={() => handleNavigate(item.link)} // ניווט בעת לחיצה
                >
                    <span style={linkStyle}>{item.label}</span>
                </div>
            ))}
        </div>
    );
}

// רשימת פריטים
const menuItems: { label: string; link: string }[] = [
    { label: 'דף הבית', link: '/homePage' },
    { label: 'תשלומים', link: '/payAdmin' },
    { label: 'הגדרת זמני תפילה', link: '/tfilotAdmin' },
    { label: 'עדכונים חמים', link: '/messageAdmin' },
    { label: 'הגדרת שיעורים', link: '/Lessons' },

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
    backgroundColor: '#63B3ED', // כחול בהיר
    color: '#E2E8F0', // צבע טקסט בהיר
    width: '200px',
    height: '200px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    position: 'relative',
    overflow: 'hidden',
};

// אפקט hover
const dashboardItemHover: CSSProperties = {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#4299E1', // כחול מעט כהה יותר
};

// עיצוב הטקסט בתוך הקישורים
const linkStyle: CSSProperties = {
    color: '#E2E8F0',
    textDecoration: 'none',
    textTransform: 'uppercase', // הופך את הטקסט לאותיות גדולות
};

// ייצוא הקומפוננטה
export default NavbarAdmin;
