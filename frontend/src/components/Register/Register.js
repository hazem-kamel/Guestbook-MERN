import React from "react";
import { connect } from "react-redux";
import { RegisterAction } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useAlert } from "react-alert";

const SignUp = (props) => {
  const alert = useAlert();

  let history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data) => {
    const userData = {
      username: data.username.toUpperCase(),
      password: data.password,
      gender: data.gender,
    };
    props.register(userData);
    setTimeout(2000, Redirect());
  };
  const Redirect = () => {
    if (props.session.user) {
      console.log(props.session.user);
      sessionStorage.setItem("storedSession", props.session.user.username);
      history.push("/dashboard");
    } else {
      alert.show(<div style={{ size: "10px" }}>{props.session.error}</div>);
    }
  };
  return (
    <div className="register">
      <div className="register-form">
        <h3 className="title">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="username"
            name="username"
            placeholder="Type your username"
            ref={register({ required: true, minLength: 3, maxLength: 10 })}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="error-before-submit">This is required</p>
          )}
          {errors.username && errors.username.type === "minLength" && (
            <p className="error-before-submit">Minimum length is 3</p>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <p className="error-before-submit">Maximum length is 10</p>
          )}
          <input
            id="password"
            name="password"
            placeholder="Type your password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="error-before-submit">This is required</p>
          )}

          <label className="label-gender" htmlFor="gender">
            Gender
          </label>
          <input name="gender" ref={register({ required: true })} list="list" />
          {errors.gender && (
            <p className="error-before-submit">This is required</p>
          )}
          <datalist id="list">
            <option value="Male" />
            <option value="Female" />
          </datalist>
          <input
            type="submit"
            className="btn"
            ref={register({ required: true })}
          />
          <a href="/login" className="login-link">
            Already have an account
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
  register: (userData) => dispatch(RegisterAction(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
