import Navbar2 from "../components/Navbar2";
import Zmanim2 from "../components/zmanim";

const ZmanimPage = () => {
  return (
    <div>
      <Navbar2 />
      <div className="pt-16"> {/* Push content down */}
        <Zmanim2 />
      </div>
    </div>
  );
};

export default ZmanimPage;
