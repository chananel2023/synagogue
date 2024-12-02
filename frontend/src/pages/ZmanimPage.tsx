import React from "react";
import Navbar2 from "../components/Navbar2";
import Zmanim2 from "../components/zmanim";

const ZmanimPage: React.FC = () => {
  return (
    <div className="w-full">
      <Navbar2 />
      <div className="pt-16 w-full"> {/* Push content down and stretch to full width */}
        <Zmanim2 />
      </div>
    </div>
  );
};

export default ZmanimPage;
