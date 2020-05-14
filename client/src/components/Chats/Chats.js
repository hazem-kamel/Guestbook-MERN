import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import io from "socket.io-client";
import "./Chats.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faAngleLeft,
  faSignOutAlt,
} from "@fortawesome/fontawesome-free-solid";
let socket = io();
const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  let friend = props.match.params.friend;
  let storedSession = sessionStorage.getItem("storedSession");
  let user = storedSession;
  function logout() {
    sessionStorage.clear();
  }
  if (!storedSession) {
    props.history.push("/");
  }
  useEffect(() => {
    Axios.post("/chat", {
      username: user,
      friend: friend,
    })
      .then((res) => {
        setConversation(res.data);
      })
      .catch((e) => {
        console.log("Cant fetch Chat ", e);
      });
  }, [props.history.location.pathname, conversation]);
  const sendMessage = (messageData) => {
    document.getElementById("message-to-send").value = "";
    socket.on("newmessage", function (data) {
      addMessages(data);
      function addMessages(message) {
        document.getElementById("messages").append(<p>{message.message}</p>);
      }
    });
    Axios.post(
      "/messages",
      {
        username: messageData.user,
        friend: messageData.friend,
        message: messageData.message,
      },
      {
        withCredentials: true,
        crossdomain: true,
      }
    )
      .then((res) => {})
      .catch((e) => {
        console.log("Cant Register ", e);
      });
  };

  return (
    <div className="">
      <div className="settings">
        <div
          className="logout"
          onClick={(e) => {
            logout();
          }}
        >
          <FontAwesomeIcon
            className="logout-button"
            icon={faSignOutAlt}
          ></FontAwesomeIcon>{" "}
        </div>
        <div className="Chats">
          <a href="/dashboard">
            <FontAwesomeIcon
              className="back"
              icon={faAngleLeft}
            ></FontAwesomeIcon>
          </a>
        </div>
      </div>
      <div className="chatWindow">
        <div className="chats-container">
          <div className="chat-window">
            <div className="chat-header">
              <img
                src="https://www.pngitem.com/pimgs/m/78-786293_1240-x-1240-0-avatar-profile-icon-png.png"
                alt="avatar"
              />
              <div className="friend-name">{friend}</div>
            </div>

            <div className="chat-history">
              <ul className="chat-ul-history">
                {conversation.map((message, key) => {
                  return (
                    <li id="messages" className="message-list" key={key}>
                      {message.sender === user ? (
                        <>
                          <div className="message-data align-right">
                            <span className="message-data-time">
                              {message.dateCreated}
                            </span>
                            <span className="message-data-name">
                              {message.sender}
                            </span>
                          </div>
                          <div className="message other-message float-right">
                            {message.message}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="message-data">
                            <span className="message-data-name">
                              <i className="fa fa-circle online"></i>
                              {message.sender}
                            </span>
                            <span className="message-data-time">
                              {message.dateCreated}
                            </span>
                          </div>
                          <div className="message my-message">
                            {message.message}
                          </div>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="send-message">
              <textarea
                className="message-to-send"
                id="message-to-send"
                placeholder="Type your message"
                rows="3"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
              <FontAwesomeIcon
                onClick={() => sendMessage({ user, friend, message })}
                className="send-button"
                icon={faPaperPlane}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
