import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub'; // אייקון גיט האב
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // אייקון לינקדין
import EmailIcon from '@mui/icons-material/Email'; // אייקון דוא"ל

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1D3557] text-white py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center">
                    
                    <p className="text-center mb-4">
בית הכנסת בית ישראל רחוב זאב זבוטינסקי 7 רמת גן. ת.ד. 564                    </p>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <Button variant="contained" color="primary" component={Link} to="/contact">
                            צור קשר
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/login">
                            יציאה
                        </Button>
                    </div>
                    <p className="text-center mt-4 flex items-center">
                        בוני האתר : ברוך ינקוביץ - חננאל טייטלבאום    
                        <span className="ml-2">
                            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                                <GitHubIcon />
                            </a>
                        </span>
                        <span className="ml-2">
                            <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                                <LinkedInIcon />
                            </a>
                        </span>
                        <span className="ml-2">
                            <a href="mailto:your-email@example.com" className="text-white hover:text-gray-300">
                                <EmailIcon />
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;