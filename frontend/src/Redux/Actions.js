import Axios from "axios";
import { Register, Login } from "./ActionTypes";

export function RegisterAction(user) {
  return (dispatch) => {
    Axios.post(
      "/api/register",
      {
        username: user.username,
        password: user.password,
        gender: user.gender,
      },
      {
        withCredentials: true,
        crossdomain: true,
      }
    )
      .then((res) => {
        dispatch({
          type: Register,
          payload: res.data,
        });
      })
      .catch((e) => {
        console.log("Cant Register ", e);
      });
  };
}
export function LoginAction(user) {
  return (dispatch) => {
    Axios.post(
      "/api/login",
      {
        username: user.username,
        password: user.password,
      },
      {
        headers: { "Access-Control-Allow-Origin": "*" },
        withCredentials: true,
        crossdomain: true,
      }
    ).then((res) => {
      dispatch({
        type: Login,
        payload: res.data,
      });
    });
  };
}
