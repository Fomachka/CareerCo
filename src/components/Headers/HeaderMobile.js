import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { auth } from "../../firebase";

import {
  MenuIcon,
  DashboardIcon,
  SearchJobsIcon,
  SavedJobsIcon,
  AddJobIcon,
  LogoutIcon,
  CloseIcon,
} from "../../images/icons/export";

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const HeaderMobile = ({ pageName }) => {
  const [modal, setModal] = useState(false);
  const { email, name, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleModal = () => {
    setModal((prev) => !prev);
  };

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
        <>
          <header className="header__mobile">
            <nav className="header__nav--mobile">
              <Link to="/dashboard" className="header__logo--mobile">
                C/CO.
              </Link>
              <p>{pageName}</p>
              <MenuIcon className="header__nav--mobile--icon" onClick={handleModal} />
            </nav>
          </header>
          <div className={`mobile__modal mobile__modal--${modal}`}>
            <header>
              <nav className="header__nav--mobile">
                <Link to="/dashboard" className="header__logo--mobile" onClick={handleModal}>
                  C/CO.
                </Link>
                <CloseIcon className="header__nav--mobile--icon" onClick={handleModal} />
              </nav>
            </header>
            <section className="mobile__modal--menu">
              <ul className="mobile__modal--ul">
                <li className="mobile__modal--li">
                  <Link to="/dashboard" className="mobile__modal--link" onClick={handleModal}>
                    <DashboardIcon className="mobile__modal--icon" />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="mobile__modal--li">
                  <Link to="/searchjobs" className="mobile__modal--link" onClick={handleModal}>
                    <SearchJobsIcon className="mobile__modal--icon" />
                    <p>Search Jobs</p>
                  </Link>
                </li>
                <li className="mobile__modal--li">
                  <Link to="/myjobs" className="mobile__modal--link" onClick={handleModal}>
                    <SavedJobsIcon className="mobile__modal--icon" />
                    <p>My Jobs</p>
                  </Link>
                </li>
                <li className="mobile__modal--li">
                  <Link to="/addjob" className="mobile__modal--link" onClick={handleModal}>
                    <AddJobIcon className="mobile__modal--icon" />
                    <p>Add Job</p>
                  </Link>
                </li>
              </ul>
            </section>
            <footer className="mobile__modal--footer">
              <div className="mobile__modal--info">
                <div className="header__desktop--email">
                  <p>{name[0].toUpperCase()}</p>
                </div>
                <div className="mobile__modal--user">
                  <p>{name}</p>
                  <p>{email}</p>
                </div>
              </div>
              <Link to="/accounts/login" className="mobile__modal--logoutIcon">
                <LogoutIcon className="header__nav--mobile--icon" onClick={handleLogout} />
              </Link>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderMobile;
