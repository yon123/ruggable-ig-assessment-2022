import "./styles.css";
import React, { useEffect, useState } from "react";
function App() {
  //error messages
  const [errorMessages, setErrorMessages] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);
  const [disableSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    if (password.length >= 6 && username.length >= 6) {
      setDisabledSubmit(false);
    } else {
      setDisabledSubmit(true);
    }
  }, [username, password]);

  //dummy database for username & password
  const database = [
    {
      username: "thisisyon2",
      password: "pass12"
    },
    {
      username: "thisisjim2",
      password: "pass22"
    }
  ];

  const errors = {
    uname: "no user name here",
    pw: "Sorry, your password was incorrect. Please double-check your password."
  };

  //Handle Submit Button to prevent pageload
  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    //find user login
    const findUserData = database.find((user) => user.username === uname.value);
    //compare user info
    if (findUserData) {
      if (findUserData.password !== pass.value) {
        //invalid pw
        setErrorMessages({ name: "pass", message: errors.pw });
      } else {
        setSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  //generate code for error messages
  const renderErrorMessages = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  //JSX code for login markup
  const renderForm = () => (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="form-input__label" htmlFor="user-name">
            <input
              aria-label="Phone number, username, or email"
              id="uname"
              type="text"
              name="uname"
              className="form__input"
              maxLength="75"
              placeholder="Phone number, username, or email"
              defaultValue={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div className="field">
          <label htmlFor="pw">
            <input
              aria-label="Password"
              placeholder="Password"
              type="password"
              name="pass"
              defaultValue={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form__input"
            />
          </label>
        </div>
        <input disabled={disableSubmit} type="submit" className="form__cta" />
        <div className="form-other__block">
          <div className="form-other__border-left"></div>
          <p className="form-other__border-text">OR</p>
          <div className="form-other__border-right"></div>
        </div>
        <p className="form-other__fb">Login with Facebook</p>
        <div>
          {renderErrorMessages("uname")}
          {renderErrorMessages("pass")}
        </div>
        <div className="form-forgot-pw__wrap">
          <a href="" className="form-forgot-pw">
            Forgot password?
          </a>
        </div>
      </form>
    </>
  );

  return (
    <div className="container">
      <div className="login-wrap">
        <div className="login-img-slideshow">
          <img
            src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
            alt=""
          />
        </div>
        <div className="login-form">
          <div className="login-wrap__login">
            <div className="login-logo__wrap">
              <div className="login-logo__img-wrap">
                <img
                  alt=""
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                />
              </div>
            </div>
            {isSubmitted ? (
              <div className="login-success__hed">Welcome to Instagram</div>
            ) : (
              renderForm()
            )}
          </div>
          <div className="login-signup">
            <p className="login-signup__text">
              Don't have an account? <a href="">Login</a>
            </p>
          </div>
          <p class="login-app__text">Get the app.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
