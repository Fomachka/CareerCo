import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsersApiData } from "../../features/users/usersApiSlice";
import { HeaderMobile, HeaderDesktop } from "../";
import Job from "./Job";
import Pagination from "../MyJobs/Pagination";
import { Loading, StarSingle, ErrorFace } from "../../images/icons/export";
import { useNavigate } from "react-router-dom";

const SearchJobs = () => {
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let currentPosts = () => {
    if (input && !location) {
      return jobs?.filter((post) =>
        post.position.toLowerCase().includes(input.toLowerCase())
      );
    } else if (!input && !location) {
      return jobs;
    } else if (!input && location) {
      return jobs?.filter((post) =>
        post.location.toLowerCase().includes(location.toLowerCase())
      );
    } else if (input && location) {
      return jobs
        ?.filter((post) => post.location.toLowerCase().includes(location.toLowerCase()))
        .filter((post) => post.position.toLowerCase().includes(input.toLowerCase()));
    }
  };

  const handlePage = (pageNumber) => {
    const maxPages = Math.ceil(currentPosts()?.length / postsPerPage);

    if (pageNumber < 1) {
      setCurrentPage(maxPages);
    } else if (pageNumber > maxPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(pageNumber);
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchApi = async () => {
      try {
        const response = await fetch(
          "https://jobsearch-api-production.up.railway.app/jobs"
        );
        const data = await response.json();
        setJobs(data);
        localStorage.setItem("data", JSON.stringify(data));
        dispatch(setUsersApiData(data));
      } catch (error) {
        setError("Something is wrong, please try again later.");
        navigate("/error");
      }
      setLoading(false);
    };
    fetchApi();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name.includes("location")) setLocation(value);
    if (!name.includes("location")) setInput(value);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard">
      <HeaderMobile pageName="Jobs Available" />
      <HeaderDesktop pageName="Jobs Available" />
      <main className="main">
        <section className="searchjobs__search">
          <div className="searchjobs__container">
            <div className="searchjobs__decoration">
              <StarSingle />
            </div>
            <div className="searchjobs__small--container">
              <div className="searchjobs__input">
                <label htmlFor="searchjobs">Search Jobs</label>
                <input
                  type="text"
                  id="searchjobs"
                  name="searchjobs"
                  value={input}
                  onChange={handleFilter}
                ></input>
                <div className="searchjobs__borders--side"></div>
              </div>
              <div className="searchjobs__input">
                <label htmlFor="searchjobs__location">Location</label>
                <input
                  type="text"
                  id="searchjobs__location"
                  name="searchjobs__location"
                  value={location}
                  onChange={handleFilter}
                ></input>
                <div className="searchjobs__borders--side"></div>
              </div>
            </div>
            <div className="searchjobs__decoration">
              <StarSingle />
            </div>
          </div>
        </section>
        {loading ? (
          <div>
            <Loading className="loading" />
          </div>
        ) : (
          <>
            {!error ? (
              <section className="searchjobs__jobs">
                {currentPosts()
                  ?.slice(indexOfFirstPost, indexOfLastPost)
                  .map((job) => (
                    <Job
                      key={job.id}
                      id={job.id}
                      position={job.position}
                      companyName={job.companyName}
                      location={job.location}
                      status={job.status}
                    />
                  ))}
              </section>
            ) : (
              <div className="searchjobs__error">
                <ErrorFace className="searchjobs__error--emoji" />
                <p>{error}</p>
              </div>
            )}
          </>
        )}
      </main>
      <footer>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={currentPosts()?.length}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      </footer>
    </div>
  );
};

export default SearchJobs;
