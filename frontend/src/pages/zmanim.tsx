import React from "react";
import Navbar2 from "../components/Navbar2";

const Zmanim = () => {
    return (
        <div className="zmanim-page">
            <Navbar2 />
            <div style={{ marginTop: '10%' }}>
                <iframe
                    src="https://www.yeshiva.org.il/generalpages/yeshivatimes"
                    width="500"
                    height="600"
                    style={{ border: 'none' }}
                    scrolling="no"
                    frameBorder="0"
                    title="זמני היום מישיבה"
                ></iframe>
            </div>
        </div>
    );
};

export default Zmanim;

