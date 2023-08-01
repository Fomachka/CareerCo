import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../../features/addjob/addjobSlice";
import { HeaderMobile, HeaderDesktop } from "../";
import { ExpandIcon } from "../../images/icons/export";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { addUsersData } from "../../features/users/usersSlice";
import { useAuth } from "../../hooks/use-auth";

const AddJob = () => {
  const [status, setStatus] = useState("Pending");
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const userCollectionRef = collection(db, "users");
  const [state, setState] = useState({
    position: "",
    companyName: "",
    location: "",
    status: status,
    date: "",
    uid: "",
  });
  const { id } = useAuth();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.users);

  useEffect(() => {
    let timer;
    if (error || success) {
      timer = setTimeout(() => {
        setError(false);
        setSuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [error, success]);

  const handleClearForm = () => {
    setState({
      position: "",
      companyName: "",
      location: "",
      status: status,
      date: "",
    });
  };

  const handleDropDown = () => {
    setActive((prev) => !prev);
  };

  const handleStatus = (e) => {
    const value = e.target.innerHTML;
    setStatus(value);
    setState((prev) => ({ ...prev, status: value }));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const createUser = async () => {
    await addDoc(userCollectionRef, { ...state, uid: id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setForm(state));
    for (let job of selector) {
      if (
        state &&
        job.companyName === state.companyName &&
        job.position === state.position
      ) {
        setError(true);
        return;
      }
    }

    createUser(state);
    dispatch(addUsersData(state));
    setSuccess(true);
  };

  return (
    <div className="dashboard">
      <HeaderMobile pageName="Add Job" />
      <HeaderDesktop pageName="Add Job" />
      <main className="main">
        <section className="addjob">
          <form className="addjob__container" onSubmit={handleSubmit} id="form1">
            <div className="addjob__input">
              <label htmlFor="position">Position / Role</label>
              <input
                type="text"
                id="position"
                name="position"
                required
                value={state.position}
                onChange={handleChange}
              ></input>
              <div className="addjob__borders--side"></div>
            </div>
            <div className="addjob__input">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="companyName"
                required
                value={state.companyName}
                onChange={handleChange}
              ></input>
              <div className="addjob__borders--side"></div>
            </div>
            <div className="addjob__input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="City"
                name="location"
                required
                value={state.location}
                onChange={handleChange}
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
                </div>
                <div className={`${active ? "" : "addjob__borders--side"}`}></div>
              </div>
            </div>
            <div className="addjob__input">
              <label htmlFor="date">Date Of Application</label>
              <input
                type="date"
                id="date"
                value={state.date}
                name="date"
                required
                onChange={handleChange}
                aria-required="true"
              ></input>
              <div className="addjob__borders--side"></div>
            </div>
          </form>
          {error ? (
            <div className="addjob__description addjob__description--error">
              <p>Current position and company already exist.</p>
              <p>Please add another job!</p>
            </div>
          ) : !error && success ? (
            <div className="addjob__description addjob__description--success">
              <p>Job added successfully.</p>
            </div>
          ) : (
            <div className="addjob__description">
              <p>Here you can add your own jobs that </p>
              <p>aren't listed in the app.</p>
            </div>
          )}
          <div className="addjob__btn--container">
            <button className="addjob__btn" type="submit" form="form1">
              Add To Job
            </button>
            <button className="addjob__btn--clear" onClick={handleClearForm}>
              Clear All
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddJob;
