import React, { useState, useEffect } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { removeUsersData } from "../../features/users/usersSlice";

const JobCard = ({ userInfo }) => {
  const [statusColor, setStatusColor] = useState(null);
  const dispatch = useDispatch();

  const handleStatusColor = () => {
    const { status } = userInfo;
    if (!status) return;
    else if (status === "Pending") setStatusColor("block-pending");
    else if (status === "Accepted") setStatusColor("block-accepted");
    else if (status === "Rejected") setStatusColor("block-rejected");
  };

  const handleRemove = async (id) => {
    const usersDoc = doc(db, "users", id);
    await deleteDoc(usersDoc);
    dispatch(removeUsersData({ id: id }));
  };

  useEffect(() => {
    handleStatusColor();
  }, [userInfo]);

  return (
    <article className="jobcard__container">
      <div className="jobcard__info">
        <div className="jobcard__logo">
          <p>{userInfo.companyName[0]}</p>
        </div>
        <div className="jobcard__info--top">
          <p>{userInfo.position}</p>
          <div className="jobcard__info--top2">
            <p>{userInfo.companyName}</p>
            <p>{userInfo.location}</p>
          </div>
        </div>
      </div>
      <div className="jobcard__info--bot">
        <div className="jobcard__info--bot1">
          <p>Status</p>
          <div className={`jobcard__info--block block1 ${statusColor}`}>
            <p>{userInfo.status}</p>
          </div>
        </div>
        <div className="jobcard__info--bot2">
          <p>Applied On</p>
          <div className="jobcard__info--block block2">
            <p>{userInfo.date}</p>
          </div>
        </div>
        <div className="jobcard__info--bot3">
          <div
            className="jobcard__info--block block3"
            onClick={() => handleRemove(userInfo.id)}
          >
            <p>Remove</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobCard;
