import React from "react";
import {
  DashboardIcon,
  SearchJobsIcon,
  SavedJobsIcon,
  AddJobIcon,
} from "../../images/icons/export";

import {
  ComputerSVG,
  SortSVG,
  PhoneSVG,
  SearchSVG,
  DashboardSVG,
} from "../../images/svg_graphics/export";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";

const Sidebar = () => {
  const [link, setLink] = useState(null);
  const [active, setActive] = useState("dashboard");
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const handleSVG = () => {
    switch (window.location.pathname.substring(1)) {
      case "myjobs":
        setLink(<ComputerSVG />);
        break;
      case "addjob":
        setLink(<SortSVG />);
        break;
      case "searchjobs":
        setLink(<SearchSVG />);
        break;
      case "dashboard":
        setLink(<DashboardSVG />);
        break;
      default:
        setLink(<PhoneSVG />);
        break;
    }
  };

  useEffect(() => {
    setActive(location.pathname.substring(1));
  }, [location.pathname]);

  useEffect(() => {
    if (window.location.pathname) {
      handleSVG();
    }
  }, [location]);

  return (
    <>
      {isLoggedIn && (
        <nav className="sidebar">
          <nav className="sidebar__nav">
            <Link className="sidebar__logo" to="/dashboard">
              CAREER/CO.
            </Link>
            <div className="desktop__modal--menu">
              <ul className="desktop__modal--ul">
                <li className="desktop__modal--li">
                  <Link
                    to="/dashboard"
                    className={`${
                      active === "dashboard" && "desktop__modal--active"
                    } desktop__modal--link`}
                    onClick={() => setActive("dashboard")}
                  >
                    <DashboardIcon className="desktop__modal--icon" />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link
                    to="/searchjobs"
                    className={`${
                      active === "searchjobs" && "desktop__modal--active"
                    } desktop__modal--link`}
                    onClick={() => setActive("searchjobs")}
                  >
                    <SearchJobsIcon className="desktop__modal--icon" />
                    <p>Search Jobs</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link
                    to="/myjobs"
                    className={`${
                      active === "myjobs" && "desktop__modal--active"
                    } desktop__modal--link`}
                    onClick={() => setActive("myjobs")}
                  >
                    <SavedJobsIcon className="desktop__modal--icon" />
                    <p>My Jobs</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link
                    to="/addjob"
                    className={`${
                      active === "addjob" && "desktop__modal--active"
                    } desktop__modal--link`}
                    onClick={() => setActive("addjob")}
                  >
                    <AddJobIcon className="desktop__modal--icon" />
                    <p>Add Job</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sidebar__img">{link}</div>
          </nav>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
