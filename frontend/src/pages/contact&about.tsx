import React from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Info, Building2, Phone } from 'lucide-react';

const AboutContactPage: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const contactMethods = [
        {
            icon: <Phone className="w-5 h-5" />,
            title: "טלפון",
            value: "03-1234567",
            href: "tel:031234567",
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            icon: <MessageCircle className="w-5 h-5" />,
            title: "WhatsApp",
            value: "שלח הודעה",
            href: "https://wa.me/1234567890",
            color: "bg-green-500 hover:bg-green-600"
        },
        {
            icon: <Mail className="w-5 h-5" />,
            title: "אימייל",
            value: "צור קשר",
            href: "mailto:example@email.com",
            color: "bg-red-500 hover:bg-red-600"
        }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar2 />

            <motion.div
                className="flex-1 pt-24 pb-12 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* About Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Building2 className="w-8 h-8 text-[#007BFF]" />
                                <h2 className="text-3xl font-bold text-[#007BFF]">
                                    אודותינו
                                </h2>
                            </div>

                            <div className="space-y-4 text-center">
                                <p className="text-gray-700 leading-relaxed">
                                    קהילתנו היא קהילה חמה, תוססת ומשפחתית, השואפת לחבר בין אנשים בכל הגילאים ובכל שלבי החיים.
                                    בית הכנסת שלנו, שהוקם בשנת 1980, הפך למרכז רוחני וחברתי עבור חברי הקהילה.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    אנו גאים במגוון הפעילויות שאנו מציעים, הכוללות שיעורי תורה, פעילויות לנוער, אירועי תרבות ופעילויות לילדים ולמשפחות.
                                    האווירה בקהילה מאופיינת בשותפות, עזרה הדדית ואהבת ישראל.
                                </p>
                            </div>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Info className="w-8 h-8 text-[#007BFF]" />
                                <h2 className="text-3xl font-bold text-[#007BFF]">
                                    צור קשר
                                </h2>
                            </div>

                            <p className="text-center text-gray-700 mb-8">
                                נשמח לשמוע ממך ולסייע בכל שאלה או צורך! תוכל ליצור קשר באמצעות האמצעים הבאים:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {contactMethods.map((method, index) => (
                                    <motion.a
                                        key={method.title}
                                        href={method.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${method.color} text-white rounded-xl p-4 flex flex-col items-center gap-2
                                                  transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: index * 0.1 }
                                            }
                                        }}
                                    >
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            {method.icon}
                                        </div>
                                        <span className="font-medium">{method.title}</span>
                                        <span className="text-sm opacity-90">{method.value}</span>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                                <h3 className="text-lg font-semibold text-[#007BFF] text-center mb-2">
                                    כתובת בית הכנסת
                                </h3>
                                <p className="text-center text-gray-700">
                                    רחוב זאב זבוטינסקי 7, רמת גן
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
};

export default AboutContactPage;