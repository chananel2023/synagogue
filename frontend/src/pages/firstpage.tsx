import React from 'react';
import { motion } from 'framer-motion';
import {
    Typography,
    Button,
    Box,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/system';

const WelcomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleNavigation = (path: string) => () => {
        window.location.href = path;
    };

    return (
        <StyledContainer className="px-4">
            <BackgroundShapes />
            <ContentWrapper className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant={isMobile ? "h4" : "h3"}
                        component="h1"
                        gutterBottom
                        align="center"
                        sx={{
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        ברוכים הבאים לבית הכנסת
                    </Typography>
                    <Typography
                        variant={isMobile ? "body1" : "h6"}
                        component="h2"
                        gutterBottom
                        align="center"
                        sx={{
                            color: '#FFFFFF',
                            mb: 3
                        }}
                    >
                        מקום לתפילה, לימוד וקהילה
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <ButtonContainer>
                        <StyledButton
                            variant="contained"
                            onClick={handleNavigation('/login')}
                            color="primary"
                        >
                            כניסה
                        </StyledButton>
                        <StyledButton
                            variant="outlined"
                            onClick={handleNavigation('/signup')}
                            color="secondary"
                        >
                            הרשמה
                        </StyledButton>
                    </ButtonContainer>
                </motion.div>
            </ContentWrapper>
        </StyledContainer>
    );
};

const StyledContainer = styled(Box)({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #007BFF, #FFD700)',
    overflow: 'hidden',
});

const ContentWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
}));

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '30px',
});

const StyledButton = styled(Button)(({ theme }) => ({
    padding: '12px 30px',
    borderRadius: '30px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    },
    touchAction: 'manipulation',
}));

const BackgroundShapes: React.FC = () => {
    const shapes = [
        { color: '#E3F2FD', size: 250, top: '5%', left: '-10%', delay: 0 },
        { color: '#F3E5F5', size: 200, top: '65%', right: '-8%', delay: 0.3 },
        { color: '#E8F5E9', size: 150, bottom: '8%', left: '8%', delay: 0.6 },
        { color: '#FFF3E0', size: 100, top: '20%', right: '15%', delay: 0.9 },
    ];

    return (
        <>
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.7, scale: 1 }}
                    transition={{
                        delay: shape.delay,
                        duration: 1.5,
                        type: "spring",
                        stiffness: 40
                    }}
                    style={{
                        position: 'absolute',
                        width: shape.size,
                        height: shape.size,
                        borderRadius: '50%',
                        backgroundColor: shape.color,
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        bottom: shape.bottom,
                        filter: 'blur(80px)',
                        zIndex: 1
                    }}
                />
            ))}
        </>
    );
};

export default WelcomePage;