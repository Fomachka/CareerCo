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
                  <Link to="/dashboard" className="desktop__modal--link">
                    <DashboardIcon className="desktop__modal--icon" />
                    <p>Dashboard</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link to="/searchjobs" className="desktop__modal--link">
                    <SearchJobsIcon className="desktop__modal--icon" />
                    <p>Search Jobs</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link to="/myjobs" className="desktop__modal--link">
                    <SavedJobsIcon className="desktop__modal--icon" />
                    <p>My Jobs</p>
                  </Link>
                </li>
                <li className="desktop__modal--li">
                  <Link to="/addjob" className="desktop__modal--link">
                    <AddJobIcon className="desktop__modal--icon" />
                    <p>Add Job</p>
                  </Link>
                </li>
              </ul>
            </div>
            {link}
          </nav>
        </nav>
      )}
    </>
  );
};

export default Sidebar;
