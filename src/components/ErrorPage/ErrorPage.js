import React from "react";
import { ErrorSVG } from "../../images/svg_graphics/export";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNavigate = () => {
    if (isLoggedIn) navigate("/dashboard");
    else navigate("/accounts");
  };

  return (
    <div className="error__page">
      <p className="error__message">404</p>
      <p className="error__message2">We could not find your page.</p>
      <ErrorSVG className="error__emoji" />
      <button className="jobdetails__back--btn" onClick={handleNavigate}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
