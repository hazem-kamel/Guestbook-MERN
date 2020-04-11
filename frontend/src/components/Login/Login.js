import React from "react";
import { LoginAction } from "../../Redux/Actions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { connect } from "react-redux";
const Login = (props) => {
  let history = useHistory();

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data) => {
    const userData = {
      username: data.username.toUpperCase(),
      password: data.password,
    };
    props.login(userData);
    setTimeout(2000, Redirect());
  };
  const Redirect = () => {
    if (props.session.user) {
      console.log(props.session);
      sessionStorage.setItem("storedSession", props.session.user.username);
      history.push("/dashboard");
    } else {
      console.log(props.session.error);
    }
  };
  return (
    <div className="login">
      <div className="login-form">
        <h3 className="title">Sign In</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            id="username"
            ref={register({ required: true })}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="error-before-submit">This is required</p>
          )}
          <input
            id="password"
            placeholder="Enter your password"
            name="password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="error-before-submit">This is required</p>
          )}
          <input
            className="btn"
            type="submit"
            ref={register({ required: true })}
          />
          <a href="/register" className="register-link">
            Create an account
          </a>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  session: state.Session,
});
const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(LoginAction(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
