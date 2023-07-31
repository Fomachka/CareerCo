import React from "react";

const StatusContainer = ({ img, text, number }) => {
  return (
    <article className="status__container">
      <img src={img} alt="pending icon" width={41} height={41} />
      <div className="status__info">
        <p>{text}</p>
        <p>{number}</p>
      </div>
      <div className="status__border--top"></div>
      <div className="status__borders--side"></div>
    </article>
  );
};

export default StatusContainer;
