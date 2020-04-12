import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import "./Dashboard.css";

const Dashboard = (props) => {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);

  let storedSession = sessionStorage.getItem("storedSession");
  let user = storedSession;

  console.log(storedSession);
  if (!storedSession) {
    props.history.push("/");
  }
  function logout() {
    sessionStorage.clear();
  }
  useEffect(() => {
    Axios.get("/friends", {
      username: user,
    })
      .then((res) => {
        setFriends(res.data);
      })
      .catch((e) => {
        console.log("Cant fetch friends ", e);
      });
  });
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
  };
  return (
    <div>
      <div
        className="logout"
        onClick={(e) => {
          logout();
        }}
      >
        <h4>Sign Out</h4>
      </div>
      <div className="friends-dashboard-container">
        <p className="chatsp">Chats</p>
        {friends !== "No Friends" ? (
          friends.map((friend, key) => {
            return (
              <div
                id={key}
                className="dashboard-friend-box "
                onClick={(e) => {
                  props.history.push(`/Chat/${friend}`);
                }}
              >
                <img
                  className="friendAvatar"
                  src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                  alt="Avatar"
                ></img>
                <div className="dashboard-text">
                  <p className="dashboard-friendName">{friend}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noFriends">You have no friends</p>
        )}
      </div>
      <div className="welcome-message">
        <h3>Live Chat Now With Your Friends</h3>
        <h3>Welcome {storedSession}</h3>
      </div>
      <div className="new-user">
        <input
          className="friend-name"
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
