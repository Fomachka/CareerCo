import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeartEmpty, HeartFull, Building, Location, Person } from "../../images/icons/export";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { addUsersData } from "../../features/users/usersSlice";
import { useAuth } from "../../hooks/use-auth";
import { useCollection } from "../../hooks/use-collection";

const Job = ({ position, companyName, location, status, id }) => {
  const [liked, setLiked] = useState(false);
  const [jobExists, setJobExists] = useState(false);
  const [currentJob, setCurrentJob] = useState(JSON.parse(localStorage.getItem("data")));
  const dispatch = useDispatch();
  const userCollectionRef = collection(db, "users");
  const { id: userId } = useAuth();
  const { users } = useCollection("users");

  const createUser = async (info) => {
    await addDoc(userCollectionRef, { ...info, uid: userId });
  };

  const handleAddJob = () => {
    let date = new Date().toLocaleDateString("en-ZA");
    if (!liked) {
      setJobExists(true);
      setLiked(true);
      createUser({
        position: currentJob[id - 1].position,
        companyName: currentJob[id - 1].companyName,
        location: currentJob[id - 1].location,
        status: "Pending",
        date: date,
        uid: userId,
      });
      dispatch(
        addUsersData({
          position: currentJob[id - 1].position,
          companyName: currentJob[id - 1].companyName,
          location: currentJob[id - 1].location,
          status: "Pending",
          date: date,
          uid: userId,
        })
      );
    }
  };

  useEffect(() => {
    const checkItem = () => {
      if (users) {
        for (let item of users) {
          if (
            item.companyName === companyName &&
            item.position === position &&
            item.uid === userId
          ) {
            setJobExists(true);
            setLiked(true);
          }
        }
      }
    };
    checkItem();
  }, [users]);

  return (
    <article className="job">
      <div className="job__header">
        <div className="jobcard__logo">
          <p>{companyName[0]}</p>
        </div>
        <div onClick={handleAddJob}>
          {liked ? (
            <HeartFull className="job__icon--heart" />
          ) : (
            <HeartEmpty className="job__icon--heartfull" />
          )}
        </div>
      </div>
      <div className="job__info">
        <div className="job__info--position">
          <Person className="job__icons" />
          <p className="job__info--p-bold">{position}</p>
        </div>
        <div className="job__info--position">
          <Building className="job__icons" />
          <p className="job__info--p">{companyName}</p>
        </div>
        <div className="job__info--position">
          <Location className="job__icons" />
          <p className="job__info--p">{location}</p>
        </div>
      </div>
      <Link to={`/searchjobs/${id}`} state={{ exists: jobExists }} className="job__btn">
        <p>More Info</p>
      </Link>
    </article>
  );
};

export default Job;
