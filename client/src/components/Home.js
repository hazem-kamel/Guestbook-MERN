import React from "react";
import "./Home.css";
const Home = (props) => {
  let storedSession = sessionStorage.getItem("storedSession");
  console.log(storedSession);
  if (storedSession) {
    props.history.push("/dashboard");
  }
  return (
    <div className="home">
      <h3>Guestbook</h3>
      <p>Contact and Chat with your friends with the best live chat app </p>
      <p> &lt; / &gt;</p>
      <div className="buttons">
        <a href="/login">
          <button>Login</button>
        </a>
        <a href="/register">
          <button>Register</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
