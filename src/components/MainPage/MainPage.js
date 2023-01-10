import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { WateringSVG } from "../../images/svg_graphics/export";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

const MainPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async (e) => {
    try {
      await signOut(auth);
      navigate("/accounts");
    } catch (e) {
      navigate("/error");
    }
  };
  return (
    <div className="mainpage">
      <section>
        <h1>CAREER/CO.</h1>
        <p>
          Find your dream job by using our unique tool to keep track of your job opportunities and
          listings
        </p>
      </section>
      <WateringSVG className="mainpage__svg" />
      <Link to="login" className="mainpage__a">
        <button className="login__button login__button--signin">Get Started</button>
      </Link>
    </div>
  );
};

export default MainPage;
