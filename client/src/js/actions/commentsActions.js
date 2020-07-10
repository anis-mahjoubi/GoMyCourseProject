import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  LOADING_COMMENT,
  ADD_COMMENT_FAIL,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_USER,
  DELETE_COMMENT_USER_FAIL
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors, clearErrors } from "./errorActions";
import axios from "axios";

export const getComments = () => (dispatch) => {
  dispatch(setCommentsLoading());
  axios.get("/api/comments").then((res) =>
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    })
  );
};

export const addComment = (comment) => (dispatch, getState) => {
  dispatch(setCommentsLoading());
  console.log("comment to add : " + JSON.stringify(comment));
  axios
    .post("/api/comments/", comment, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(clearErrors());
      dispatch({
        type: ADD_COMMENT,
        payload: { comment: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          ADD_COMMENT_FAIL
        )
      );
    });
};

export const deleteComment = commentID => (dispatch,getState) => {
  dispatch(setCommentsLoading());
  axios.delete(`/api/comments/${commentID}`,tokenConfig(getState))
    .then (res => {
      dispatch(clearErrors())
      console.log("sending payload : "+commentID)
      dispatch({
        type: DELETE_COMMENT,
        payload: { commentID: commentID },
      });
    })
    .catch(err=> {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          DELETE_COMMENT_FAIL
        )
      )
    })
}


export const deleteUserComments = userID => (dispatch, getState) => {
  dispatch(setCommentsLoading());
  axios.delete(`/api/comments/user/${userID}`, tokenConfig(getState))
    .then(res => {
      dispatch(clearErrors())
      dispatch({
        type: DELETE_COMMENT_USER,
        payload: { userID },
      });
    })
    .catch(err => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          DELETE_COMMENT_USER_FAIL
        )
      )
    })
}


export const setCommentsLoading = () => {
  return {
    type: LOADING_COMMENT,
  };
};