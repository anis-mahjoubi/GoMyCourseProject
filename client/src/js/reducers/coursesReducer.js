import {
  GET_COURSES,
  ADD_COURSE,
  ADD_COURSE_SUCCESS,
  DELETE_COURSE,
  UPDATE_COURSE,
  LOADING_COURSE,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  DELETE_COURSE_USER,
} from "../actions/types";

const initialState = {
  courses: [],
  loading: false,
  createdCourse: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        loading: false,
      };
    case ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload.course],
        loading: false,
        createdCourse: action.payload.course._id,
      };
    case ADD_COURSE_SUCCESS:
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        createdCourse: null,
      };
    case UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) => course._id === action.payload.course._id ? action.payload.course : course ),
        loading: false,
        createdCourse: action.payload.course._id,
      };
    case DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload.courseID
        ),
        loading: false,
      };
    case DELETE_COURSE_USER:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id_author !== action.payload.userID
        ),
        loading: false,
      };
    case LOADING_COURSE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
