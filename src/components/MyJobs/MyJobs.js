import React, { useState, useEffect } from "react";
import { HeaderMobile, HeaderDesktop } from "../";
import { ExpandIcon } from "../../images/icons/export";
import JobCard from "./JobCard";

import { useAuth } from "../../hooks/use-auth";
import { useCollection } from "../../hooks/use-collection";
import Pagination from "./Pagination";
import { Loading } from "../../images/icons/export";

const MyJobs = () => {
  const { id } = useAuth();
  const { users } = useCollection("users");
  const [user, setUser] = useState();
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Show All");
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handleDropDown = () => {
    setActive((prev) => !prev);
  };

  const handleStatus = (e) => {
    const value = e.target.innerHTML;
    setStatus(value);
    setCurrentPage(1);
  };

  const handlePage = (pageNumber) => {
    const maxPages = Math.ceil(
      user?.filter((user) => user.uid === id).length / postsPerPage
    );
    if (pageNumber < 1) {
      setCurrentPage(maxPages);
    } else if (pageNumber > maxPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  const handlePositionFilter = (e) => {
    const value = e.target.value;
    setPosition(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoading(true);
    const currentPosts = () => {
      if (users && !loading) {
        if (status === "Show All" && position.length > 0) {
          setUser(
            users.filter((user) =>
              user.position.toLowerCase().includes(position.toLowerCase())
            )
          );
        } else if (status === "Show All" && !position.length) {
          setUser(users);
        } else if (status && position.length > 0) {
          setUser(
            users
              .filter((post) => post.status === status)
              .filter((user) =>
                user.position.toLowerCase().includes(position.toLowerCase())
              )
          );
        } else if (status && !position.length) {
          setUser(users.filter((post) => post.status === status));
        }
      }
      setLoading(false);
    };

    currentPosts();
  }, [position, status, users, loading]);

  console.log(loading);

  return (
    <div className="dashboard">
      <HeaderMobile pageName="My Jobs" />
      <HeaderDesktop pageName="My Jobs" />
      <main className="main">
        <section className="addjob">
          <form className="addjob__container">
            <div className="addjob__input">
              <label htmlFor="position">Filter By Position</label>
              <input
                type="text"
                id="position"
                name="position"
                onChange={handlePositionFilter}
                value={position}
              ></input>
              <div className="addjob__borders--side"></div>
            </div>

            <div className="addjob__input" onClick={handleDropDown}>
              <label htmlFor="status">Status</label>
              <div className="addjob__btn--dropdown">
                <button type="button" id="status">
                  <p>{status}</p>
                  <ExpandIcon className="addjob__btn--icon" />
                </button>
                <div
                  className="addjob__dropdown--content"
                  style={{ display: active ? "block" : "none" }}
                >
                  <p onClick={handleStatus}>Accepted</p>
                  <p onClick={handleStatus}>Pending</p>
                  <p onClick={handleStatus}>Rejected</p>
                  <p onClick={handleStatus}>Show All</p>
                </div>
                <div className={`${active ? "" : "addjob__borders--side"}`}></div>
              </div>
            </div>
          </form>
        </section>
        {loading && !error && (
          <div className="loading__container">
            <Loading className="loading" />
          </div>
        )}
        {error ? (
          <div className="myjobs__error">
            <p>{error} </p>
            <p>Too many attempts. Try again later.</p>
          </div>
        ) : (
          <section className="myjobs">
            {user != null && !loading
              ? user
                  .filter((user) => user.uid === id)
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((user) => <JobCard key={user.id} userInfo={user} />)
              : user === null &&
                !loading && (
                  <p className="myjobs__empty">
                    The list is empty, please add jobs to continue.
                  </p>
                )}
          </section>
        )}
      </main>
      <footer>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={user?.filter((user) => user.uid === id).length}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </footer>
    </div>
  );
};

export default MyJobs;
