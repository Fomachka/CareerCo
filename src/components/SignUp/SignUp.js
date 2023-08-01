import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/index.css";
import starImg from "../../images/icons/star_full.svg";
import { useDispatch } from "react-redux";
import { setAccount } from "../../features/account/accountSlice";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { closeIcon } from "../../images/icons/export";
import { SignUpSVG } from "../../images/svg_graphics/export";

const SignUp = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async (e) => {
    try {
      await signOut(auth);
      navigate("/accounts/signup");
    } catch (e) {
      navigate("/error");
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = values;

    await createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(auth.currentUser, { displayName: name });
        dispatch(
          setAccount({
            id: user.uid,
            email: user.email,
            token: user.accessToken,
            name: user.email,
          })
        );
        navigate("/accounts/login");
      })
      .catch((error) => {
        if (error.message.trim().includes("email-already")) {
          setError("Email already in use.");
        }
      });
  };

  return (
    <div className="login">
      <header>
        <nav className="login__nav">
          <a href="/" className="login__logo">
            C/CO.
          </a>
        </nav>
      </header>
      <section className="login__section">
        <form onSubmit={handleSubmit} className="login__form">
          <article>
            <div className="login__div--img">
              <img
                src={starImg}
                alt="star decoration"
                className="login__starImg"
                width={47}
                height={47}
              />
            </div>
            <header className="login__header--welcome">
              <h1>Sign Up</h1>
              <p>To sign up, please complete your</p>
              <p>information below.</p>
            </header>
            <div className={`login__error ${error ? "login__error--active" : null}`}>
              {error ? (
                <>
                  <img
                    src={closeIcon}
                    alt="close error button"
                    onClick={() => setError(null)}
                    width={48}
                    hight={48}
                  />
                  <p>{error}</p>
                </>
              ) : null}
            </div>
          </article>
          <article className="login__article--credentials">
            <input
              type="text"
              className="login__input--id"
              value={values.name}
              minLength={3}
              name="name"
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="login__input--id"
              placeholder="Your Email"
              required
            ></input>
            <input
              type="password"
              className="login__input--id"
              name="password"
              minLength={6}
              value={values.password}
              onChange={handleChange}
              placeholder="Create Your Password"
              autoCorrect="on"
              required
            ></input>
          </article>
          <article className="login__article--credentials">
            <button type="submit" className="login__button login__button--signin">
              Sign Up
            </button>
            <footer className="login__footer">
              Already have an account?{" "}
              <Link className="login__footer--link" to="/accounts/login">
                Sign In
              </Link>{" "}
              now
            </footer>
          </article>
          <SignUpSVG className="login__svg" />
        </form>
      </section>
    </div>
  );
};

export default SignUp;
