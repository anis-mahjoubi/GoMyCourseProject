import {
  GET_VIDEOS,
  ADD_VIDEO,
  DELETE_VIDEO,
  UPDATE_VIDEO,
  LOADING_VIDEOS,
  // DELETE_USER_VIDEO,
} from "../actions/types";

const initialState = {
  videos: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
      };
    case ADD_VIDEO:
      return {
        ...state,
        videos: [...state.videos, action.payload.video],
        loading: false,
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === action.payload.video._id ? action.payload.video : video
        ),
        loading: false,
      };
    case DELETE_VIDEO:
      return {
        ...state,
        videos: state.videos.filter(
          (video) => video._id !== action.payload.videoID
        ),
        loading: false,
      };
    // case DELETE_USER_VIDEO:
    //   return {
    //     ...state,
    //     videos: state.videos.filter(
    //       (video) => video._id !== action.payload.videoID
    //     ),
    //     loading: false,
    //   };
    case LOADING_VIDEOS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
