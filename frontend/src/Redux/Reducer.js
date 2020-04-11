import { Register, Login } from "./ActionTypes";

const initialState = {
  Session: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case Register:
      return {
        Session: action.payload,
      };
    case Login:
      return {
        Session: action.payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
