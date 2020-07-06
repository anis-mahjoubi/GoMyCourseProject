import {
  GET_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
  UPDATE_COURSE_FAIL,
  UPDATE_COURSE_SUCCESS,
  LOADING_COURSE,
  ADD_COURSE_FAIL,
  ADD_COURSE_SUCCESS,
  DELETE_VIDEO,
  DELETE_COURSE_FAIL,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors, clearErrors } from "./errorActions";
import axios from "axios";

export const getCourses = () => (dispatch) => {
  dispatch(setCoursesLoading());
  axios.get("/api/cours").then((res) =>
    dispatch({
      type: GET_COURSES,
      payload: res.data,
    })
  );
};

export const addCourse = (course) => (dispatch, getState) => {
  dispatch(setCoursesLoading());
  console.log("course to add : " + JSON.stringify(course));
  axios
    .post("/api/cours/", course, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(clearErrors());
      dispatch({
        type: ADD_COURSE,
        payload: { course: res.data.course },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          ADD_COURSE_FAIL
        )
      );
    });
};

export const updateCourse =(course) => (dispatch,getState) => {
  dispatch(setCoursesLoading());
  console.log("course updating : " + JSON.stringify(course));
  axios
    .put("/api/cours/"+course._id, course, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(clearErrors());
      dispatch({
        type: UPDATE_COURSE,
        payload: { course: course },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          UPDATE_COURSE_FAIL
        )
      );
    });
}

export const deleteCourse = courseID => (dispatch,getState) => {
  dispatch(setCoursesLoading());
  axios.delete(`/api/cours/${courseID}`,tokenConfig(getState))
    .then (res => {
      dispatch(clearErrors())
      console.log("sending payload : "+courseID)
      dispatch({
        type: DELETE_COURSE,
        payload: { courseID: courseID },
      });
    })
    .catch(err=> {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          DELETE_COURSE_FAIL
        )
      )
    })
}

export const setCoursesLoading = () => {
  return {
    type: LOADING_COURSE,
  };
};

export const clearEditCourse = () => {
  return {
    type: ADD_COURSE_SUCCESS,
  };
};
