import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENT_USER,
  LOADING_COMMENT,
} from "../actions/types";

const initialState = {
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
          comments: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
          comments: [...state.comments, action.payload.comment],
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload.commentID
        ),
        loading: false,
      };
    case DELETE_COMMENT_USER:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id_user !== action.payload.userID
        ),
        loading: false,
      };
    case LOADING_COMMENT:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
