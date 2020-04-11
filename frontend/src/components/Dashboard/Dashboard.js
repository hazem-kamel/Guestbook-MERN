import React, { useState } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import "./Dashboard.css";
const Dashboard = (props) => {
  const [friend, setFriend] = useState("");
  let storedSession = sessionStorage.getItem("storedSession");

  const checkUser = (user) => {
    Axios.post(
      "/api/check",
      {
        username: user.toUpperCase(),
      },
      {
        withCredentials: true,
        crossdomain: true,
      }
    )
      .then((user) => {
        if (user.data.error) {
          alert(user.data.error);
        } else {
          {
            props.history.push(`/Chat/${user.data}`);
          }
          console.log(user.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(user);
  };
  return (
    <div>
      <div className="logout">
        <i class="fas fa-sign-out-alt"></i>
      </div>
      <h3>Live Chat Now With Your Friends</h3>
      <h3>Welcome {storedSession}</h3>
      <div>
        <input
          onChange={(event) => setFriend(event.target.value)}
          type="text"
          placeholder="type your friend's username"
        ></input>

        <button
          className="chat-button"
          onClick={(e) => {
            checkUser(friend);
          }}
        >
          Chat
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.Session,
});

export default connect(mapStateToProps)(Dashboard);
