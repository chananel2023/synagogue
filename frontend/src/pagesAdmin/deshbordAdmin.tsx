import React, { useState, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    <span
                        style={{
                            ...linkStyle,
                            fontSize: hoverIndex === index ? '2rem' : '1.2rem', // שינוי גודל הפונט
                        }}
                    >
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

// רשימת פריטים
const menuItems: { label: string; link: string }[] = [
    { label: 'תשלומים', link: '/payAdmin' },
    { label: 'תפילות', link: '/tfilotAdmin' },
    { label: 'עדכונים חמים', link: '/messageAdmin' },
    { label: 'שיעורים', link: '/Lessons' },
    { label: 'קרוסלה', link: '/UpdataAdminCarousel' },
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
    backgroundColor: '#63B3ED',
    color: '#E2E8F0',
    width: '200px',
    height: '200px',
    borderRadius: '40px',
    textAlign: 'center',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease', // שינוי כל המאפיינים בצורה חלקה
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
    backgroundColor: '#4299E1',
    width: '300px', // גודל כפול ברוחב
    height: '300px', // גודל כפול בגובה
    borderRadius: '50px', // שינוי רדיוס הקצוות
};

// עיצוב הטקסט בתוך הקישורים
const linkStyle: CSSProperties = {
    color: '#E2E8F0',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'font-size 0.3s ease',
    fontFamily: '"Suez One", serif', // שימוש בפונט Suez One
};


// ייצוא הקומפוננטה
export default NavbarAdmin;
