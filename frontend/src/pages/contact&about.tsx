import React from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer'
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { WhatsApp, Email, Info, ContactMail } from '@mui/icons-material';

const AboutContactPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F3F4F6' }}>
            <Navbar2 />

            <Container maxWidth="lg" sx={{ mt: 12, mb: 4, flex: 1 }}>
                <Grid container spacing={4}>
                    {/* אודות */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#1E3A8A', fontWeight: 'bold', textAlign: 'center' }}>
                                <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                                אודותינו
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ mb: 2, textAlign: 'center' }}>
                                קהילתנו היא קהילה חמה, תוססת ומשפחתית, השואפת לחבר בין אנשים בכל הגילאים ובכל שלבי החיים.
                                בית הכנסת שלנו, שהוקם בשנת 1980, הפך למרכז רוחני וחברתי עבור חברי הקהילה.
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ textAlign: 'center' }}>
                                אנו גאים במגוון הפעילויות שאנו מציעים, הכוללות שיעורי תורה, פעילויות לנוער, אירועי תרבות ופעילויות לילדים ולמשפחות.
                                האווירה בקהילה מאופיינת בשותפות, עזרה הדדית ואהבת ישראל.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* צור קשר */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#1E3A8A', fontWeight: 'bold', textAlign: 'center' }}>
                                <ContactMail sx={{ mr: 1, verticalAlign: 'middle' }} />
                                צור קשר
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ mb: 4, textAlign: 'center' }}>
                                נשמח לשמוע ממך ולסייע בכל שאלה או צורך! תוכל ליצור קשר באמצעות האמצעים הבאים:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, justifyContent: 'center', mt: 'auto' }}>
                                <Button
                                    variant="contained"
                                    startIcon={<WhatsApp />}
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        backgroundColor: '#25D366',
                                        '&:hover': { backgroundColor: '#128C7E' },
                                        width: isMobile ? '100%' : 'auto'
                                    }}
                                >
                                    WhatsApp
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<Email />}
                                    href="mailto:example@email.com"
                                    sx={{
                                        backgroundColor: '#EA4335',
                                        '&:hover': { backgroundColor: '#B23121' },
                                        width: isMobile ? '100%' : 'auto'
                                    }}
                                >
                                    Email
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
};

export default AboutContactPage;