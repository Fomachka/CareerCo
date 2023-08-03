import React, { useState, useEffect } from "react";
import "../../css/index.css";
import starImg from "../../images/icons/star_full.svg";
import passwordIcon from "../../images/icons/password_icon.svg";
import { Link } from "react-router-dom";
import { setAccount } from "../../features/account/accountSlice";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { closeIcon } from "../../images/icons/export";

import { BuildingSVG } from "../../images/svg_graphics/export";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const [accountInfo, setAccountInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    handleLogout();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAccountInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = accountInfo;

    await signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setAccount({
            id: user.uid,
            email: user.email,
            token: user.accessToken,
            name: user.displayName,
          })
        );

        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/too-many-requests") {
          setError("Please, try again later.");
        } else if (error.code === "auth/user-not-found") {
          setError("User not found, sign up below.");
        } else if (error.code === "auth/wrong-password") {
          setError("Wrong password");
        }
      });
  };

  const handleLogout = async (e) => {
    try {
      await signOut(auth);
      navigate("/accounts/login");
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <div className="login">
      <header>
        <nav className="login__nav">
          <a href="/" className="login__logo">
            <span className="login__logo--full">CAREER/CO.</span>
            <span className="login__logo--short">C/CO.</span>
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
              <h1>Welcome!</h1>
              <p>To continue using this app,</p>
              <p>please sign in first.</p>
            </header>

            <div className={`login__error ${error ? "login__error--active" : null}`}>
              {error ? (
                <>
                  <img
                    src={closeIcon}
                    alt="close error button"
                    onClick={() => setError(null)}
                    width={48}
                    height={48}
                  />
                  <p>{error}</p>
                </>
              ) : null}
            </div>
          </article>
          <article className="login__article--credentials">
            <input
              type="email"
              className="login__input--id"
              placeholder="Email"
              name="email"
              value={accountInfo.email}
              onChange={handleChange}
              required
            />
            <div className="login__input--div">
              <input
                type="password"
                className="login__input--id"
                minLength={6}
                placeholder="Password"
                name="password"
                value={accountInfo.password}
                onChange={handleChange}
                autoComplete="on"
                required
              />
              <img
                src={passwordIcon}
                alt="password hiding icon"
                className="login__input--icon"
                width={18}
                height={18}
              />
            </div>
          </article>

          <article className="login__article--credentials">
            <div className="login__article__buttons">
              <button type="submit" className="login__button login__button--signin">
                Sign In
              </button>
            </div>
            <footer className="login__footer">
              Don't have any account?{" "}
              <Link className="login__footer--link" to="/accounts/signup">
                Sign Up
              </Link>{" "}
              now
            </footer>
          </article>
          <BuildingSVG className="login__svg" />
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
