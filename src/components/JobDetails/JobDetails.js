import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { HeaderMobile, HeaderDesktop } from "../";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { addUsersData } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const JobDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const selector = useSelector((state) => state.users);
  const [exists, setExists] = useState(location.state.exists);
  const [button, setButton] = useState(false);
  const [currentJob, setCurrentJob] = useState([]);
  const userCollectionRef = collection(db, "users");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useAuth();

  const createUser = async (info) => {
    await addDoc(userCollectionRef, { ...info });
  };

  const handleAddJob = () => {
    let date = new Date().toLocaleDateString("en-ZA");

    if (selector) {
      setButton(true);
      createUser({
        position: currentJob[id - 1].position,
        companyName: currentJob[id - 1].companyName,
        location: currentJob[id - 1].location,
        status: "Pending",
        date: date,
        id: id - 1,
        uid: userId,
      });
      dispatch(
        addUsersData({
          position: currentJob[id - 1].position,
          companyName: currentJob[id - 1].companyName,
          location: currentJob[id - 1].location,
          status: "Pending",
          date: date,
          id: id - 1,
          uid: userId,
        })
      );
    }
  };

  useEffect(() => {
    let job = JSON.parse(localStorage.getItem("data"));
    setCurrentJob(job);
  }, []);

  return (
    <div className="dashboard">
      <HeaderMobile pageName="Job Description" />
      <HeaderDesktop pageName="Add Job" />
      <main className="main">
        {currentJob.length > 0 && (
          <section className="jobdetails">
            <div className="jobdetails__container">
              <div className="jobdetails__info">
                <div className="jobdetails__logo">
                  <p>{currentJob[id - 1].companyName[0]}</p>
                </div>
                <div className="jobdetails__info--top">
                  <p>{currentJob[id - 1].position}</p>
                  <p>{currentJob[id - 1].companyName}</p>
                  <p>{currentJob[id - 1].location}</p>
                </div>
                {exists || button ? (
                  <div className="jobdetails__info--btn jobdetails__btn--exists">
                    <p>Already Added</p>
                  </div>
                ) : (
                  <div className="jobdetails__info--btn">
                    <p onClick={handleAddJob}>Quick Add</p>
                  </div>
                )}
              </div>
              <div className="jobdetails__info--bot">
                <div className="jobdetails__part">
                  <p>Location</p>
                  <p>{currentJob[id - 1].location}</p>
                </div>
                <div className="jobdetails__hr"></div>
                <div className="jobdetails__part">
                  <p>Salary</p>
                  <p>$ {currentJob[id - 1].salary} / year</p>
                </div>
                <div className="jobdetails__hr"></div>
                <div className="jobdetails__part--info">
                  <p>Information</p>
                  <p>{currentJob[id - 1].information}</p>
                </div>
                <div className="jobdetails__hr"></div>
                <div className="jobdetails__part--details">
                  <p>Minimum Requirements</p>
                  <ul>
                    {currentJob[id - 1].requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="jobdetails__back" onClick={() => navigate(-1)}>
          <button className="jobdetails__back--btn">Go Back</button>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
