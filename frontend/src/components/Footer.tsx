import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, LogOut, MessageCircle } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        {
            icon: <Github className="w-5 h-5" />,
            href: "https://github.com/yourusername",
            label: "GitHub"
        },
        {
            icon: <Linkedin className="w-5 h-5" />,
            href: "https://www.linkedin.com/in/yourusername",
            label: "LinkedIn"
        },
        {
            icon: <Mail className="w-5 h-5" />,
            href: "mailto:your-email@example.com",
            label: "Email"
        }
    ];

    const footerButtons = [
        {
            text: "צור קשר",
            icon: <MessageCircle className="w-4 h-4" />,
            to: "/contact"
        },
        {
            text: "יציאה",
            icon: <LogOut className="w-4 h-4" />,
            to: "/login"
        }
    ];

    return (
        <footer className="bg-gradient-to-b from-[#1D3557] to-[#152744] text-white py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col items-center space-y-6">
                    {/* Address Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-center"
                    >
                        <MapPin className="w-5 h-5 text-yellow-400" />
                        <p className="text-gray-200">
                            בית הכנסת בית ישראל | רחוב זאב זבוטינסקי 7 רמת גן | ת.ד. 564
                        </p>
                    </motion.div>

                    {/* Buttons Section */}
                    <div className="flex flex-col md:flex-row gap-4">
                        {footerButtons.map((button, index) => (
                            <motion.div
                                key={button.text}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <Link
                                    to={button.to}
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 
                                             text-white rounded-full transition-colors duration-300"
                                >
                                    {button.icon}
                                    <span>{button.text}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Social Links & Credits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col items-center gap-4 pt-4 border-t border-white/20"
                    >
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-white/80 hover:text-white transition-colors duration-300"
                                    title={link.label}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                        <div className="text-center text-sm text-gray-300">
                            <p>בוני האתר</p>
                            <p className="font-medium">ברוך ינקוביץ - חננאל טייטלבאום</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);