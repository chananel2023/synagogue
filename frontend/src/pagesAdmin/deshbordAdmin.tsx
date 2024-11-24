import React, { useState, CSSProperties } from 'react';

function NavbarAdmin() {
    // מצב כדי לנהל את ה-Hover עבור כל כפתור
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    // הפונקציות להפעלת מצב hover
    const handleMouseEnter = (index: number) => setHoverIndex(index);
    const handleMouseLeave = () => setHoverIndex(null);

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
                >
                    <a href={item.link} style={linkStyle}>{item.label}</a>
                </div>
            ))}
        </div>
    );
}

// רשימת פריטים
const menuItems: { label: string; link: string }[] = [
    { label: 'דף הבית משתמשים', link: '/homePage' },
    { label: 'תשלומים', link: '/payAdmin' },
    { label: 'הגדרת זמני תפילה', link: '/tfilotAdmin' },
    { label: 'עדכונים חמים', link: '/messageAdmin' },
];

// עיצוב הדשבורד הכללי
const dashboardContainer: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
};

// עיצוב של כל כפתור/קובייה
const dashboardItem: CSSProperties = {
    backgroundColor: '#333',
    color: 'white',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
};

// אפקט hover
const dashboardItemHover: CSSProperties = {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
};

// עיצוב הטקסט בתוך הקישורים
const linkStyle: CSSProperties = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'block',
};

export default NavbarAdmin;
