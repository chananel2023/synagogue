import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, SvgIcon, useTheme, useMediaQuery } from '@mui/material';
import { PaymentOutlined, SchoolOutlined, MessageOutlined, SlideshowOutlined, HourglassBottom } from '@mui/icons-material';
import { motion } from 'framer-motion';

const menuItems = [
    { label: 'תשלום', link: '/payAdmin', icon: <PaymentOutlined /> },
    { label: 'תפילות', link: '/tfilotAdmin', icon: <SchoolOutlined /> },
    { label: 'הודעות', link: '/messageAdmin', icon: <MessageOutlined /> },
    { label: 'שיעורים', link: '/Lessons', icon: <SchoolOutlined /> },
    { label: 'קרוסלה', link: '/UpdataAdminCarousel', icon: <SlideshowOutlined /> },
    { label: 'מקומות', link: '/mapadmin', icon: <HourglassBottom/>},

];

const IconWrapper: React.FC<{ icon: React.ReactElement }> = ({ icon }) => {
    return <>{icon}</>;
};

const NavbarAdmin: React.FC = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleMouseEnter = useCallback((index: number) => setHoverIndex(index), []);
    const handleMouseLeave = useCallback(() => setHoverIndex(null), []);

    const handleNavigate = useCallback((link: string) => {
        navigate(link);
    }, [navigate]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'transparent',
            }}
        >
            {menuItems.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleNavigate(item.link)}
                    style={{
                        backgroundColor: '#1D3557',
                        color: '#FFFF00',
                        width: isMobile ? '150px' : '200px',
                        height: isMobile ? '150px' : '200px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...(hoverIndex === index
                            ? {
                                transform: 'scale(1.05)',
                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                            }
                            : {}),
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <SvgIcon
                            sx={{
                                fontSize: isMobile ? '2rem' : '3rem',
                                color: '#FFFF00',
                            }}
                        >
                            {item.icon}
                        </SvgIcon>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#FFFF00',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                transition: 'font-size 0.3s ease',
                                fontSize: hoverIndex === index ? (isMobile ? '1.2rem' : '1.5rem') : (isMobile ? '1rem' : '1.2rem'),
                                marginTop: '8px',
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                </motion.div>
            ))}
        </Box>
    );
};

export default React.memo(NavbarAdmin);