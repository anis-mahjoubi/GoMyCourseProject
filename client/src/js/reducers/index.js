import { combineReducers } from "redux";
import coursesReducer from "./coursesReducer";
import videosReducer from "./videosReducer";
import usersReducer from "./usersReducer";
import commentsReducer from "./commentsReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  courses: coursesReducer,
  videos: videosReducer,
  users: usersReducer,
  comments: commentsReducer,
  error: errorReducer,
  auth: authReducer,
});
