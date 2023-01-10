import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const HeaderDesktop = ({ pageName }) => {
  const navigate = useNavigate();
  const { isLoggedIn, name } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/accounts/login");
    } catch (e) {
      navigate("/error");
    }
  };
  return (
    <>
      {isLoggedIn && (
        <header className="header__desktop">
          <div>
            <p>{pageName}</p>
          </div>
          <div className="header__desktop--logout">
            <div className="header__desktop--email">
              <p>{name[0].toUpperCase()}</p>
            </div>
            <p onClick={handleLogout}>Logout</p>
          </div>
        </header>
      )}
    </>
  );
};

export default HeaderDesktop;
