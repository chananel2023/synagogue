import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1D3557] text-white py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4">פרטים על האתר</h2>
                    <p className="text-center mb-4">
                        אתר זה נועד לספק מידע על זמני תפילות ושיעורים בבית הכנסת אורט סינגאלובסקי.
                    </p>
                    <p className="text-center mb-4">
                        אנו מזמינים אתכם ליצור קשר באמצעות האפליקציות המופיעות למטה.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <Button variant="contained" color="primary" component={Link} to="/contact">
                            צור קשר
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/login">
                            יציאה
                        </Button>
                    </div>
                    <p className="text-center mt-4">בונה האתר: [שם הבונה]</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;