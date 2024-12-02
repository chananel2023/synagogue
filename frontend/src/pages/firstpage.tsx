import React from 'react';
import { motion } from 'framer-motion';
import {
    Typography,
    Button,
    Box,
    Container,
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
        <StyledContainer>
            <BackgroundShapes />
            <ContentWrapper>
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
                            color: '#2E3B55',
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        ברוכים הבאים לבית הכנסת
                    </Typography>
                    <Typography
                        variant={isMobile ? "h6" : "h5"}
                        component="h2"
                        gutterBottom
                        align="center"
                        sx={{
                            color: '#4A4A4A',
                            mb: 3
                        }}
                    >
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
                            יצירת חשבון
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
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
});

const ContentWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255,0.9)',
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
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
    },
}));

const BackgroundShapes: React.FC = () => {
    const shapes = [
        { color: '#E3F2FD', size: 200, top: '10%', left: '-5%', delay: 0 },
        { color: '#F3E5F5', size: 150, top: '70%', right: '-5%', delay: 0.5 },
        { color: '#E8F5E9', size: 100, bottom: '10%', left: '10%', delay: 1 },
    ];

    return (
        <>
            {shapes.map((shape, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: shape.delay,
                        duration: 1,
                        type: "spring",
                        stiffness: 50
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
                        opacity: 0.6,
                        filter: 'blur(60px)',
                        zIndex: 1
                    }}
                />
            ))}
        </>
    );
};

export default WelcomePage;