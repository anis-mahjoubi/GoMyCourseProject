import {
  GET_VIDEOS,
  ADD_VIDEO,
  ADD_VIDEO_FAIL,
  DELETE_VIDEO,
  DELETE_VIDEO_FAIL,
  DELETE_USER_VIDEO,
  DELETE_USER_VIDEO_FAIL,
  UPDATE_VIDEO,
  UPDATE_VIDEO_FAIL,
  LOADING_VIDEOS,
} from "./types";
import Axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors, clearErrors } from "./errorActions";

export const getVideos = () => (dispatch) => {
  dispatch(setVideosLoading());
  Axios.get("/api/videos").then((res) =>
    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    })
  );
};

export const addVideo = (video) => (dispatch, getState) => {
  dispatch(setVideosLoading());
  Axios.post("/api/videos/", video, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(clearErrors());
      dispatch({
        type: ADD_VIDEO,
        payload: { video: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, ADD_VIDEO_FAIL)
      );
    });
};

export const updateVideo = (video) => (dispatch, getState) => {
  dispatch(setVideosLoading());
  Axios.put(`/api/videos/${video._id}`, video, tokenConfig(getState))
    .then((res) => {
      console.log(res);
      dispatch(clearErrors());
      dispatch({
        type: UPDATE_VIDEO,
        payload: { video: video },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          UPDATE_VIDEO_FAIL
        )
      );
    });
};

export const deleteVideo = (videoID) => (dispatch, getState) => {
  dispatch(setVideosLoading());
  Axios.delete(`/api/videos/${videoID}`, tokenConfig(getState))
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: DELETE_VIDEO,
        payload: { videoID: videoID },
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          DELETE_VIDEO_FAIL
        )
      );
    });
};

// export const deleteUserVideo = (userID) => (dispatch, getState) => {
//   dispatch(setVideosLoading());
//   Axios.delete(`/api/videos/user/${userID}`, tokenConfig(getState))
//     .then((res) => {
//       dispatch(clearErrors());
//       dispatch({
//         type: DELETE_USER_VIDEO,
//         payload: { userID: userID },
//       });
//     })
//     .catch((err) => {
//       dispatch(
//         returnErrors(
//           err.response.data.msg,
//           err.response.status,
//           DELETE_USER_VIDEO_FAIL
//         )
//       );
//     });
// };

export const setVideosLoading = () => {
  return {
    type: LOADING_VIDEOS,
  };
};
