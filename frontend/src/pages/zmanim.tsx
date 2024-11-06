import React from "react";
import Navbar from "../components/navbar";

const Zmanim = () => {
    return (
        <div style={{ backgroundColor: '#EDEDED', height: '100vh', margin: 0 }}>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <iframe
                    src="https://www.yeshiva.org.il/generalpages/yeshivatimes"
                    width="500"
                    height="600"
                    style={{ transform: 'scale(1.2)', transformOrigin: '0 0' }}
                    scrolling="no"
                    frameBorder="0"
                    title="Yeshiva Times Information"
                ></iframe>
            </div>
        </div>
    );
};

export default Zmanim;