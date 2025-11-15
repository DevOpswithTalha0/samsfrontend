export const AUTH_ENDPOINTS = {
  REGISTER: "user/register",
  LOGIN: "user/login",
  LOGOUT: "user/logout",
  VERIFY_EMAIL: "user/verify-email",
  RESEND_VERIFICATION: "user/resend-verification-email",
  GET_USER: "user/get-user",
  CHANGE_PASSWORD: "user/change-password",
  USER_DETAILS: "user/update-account-detail",
  GET_ALL_STUDENTS: "user/get-all-students",
};

export const GRIEVANCE_ENDPOINTS = {
  SUBMIT: "grievance/submit",
  UPDATE: "grievance/update",
  DELETE: "grievance/delete",
  GET_ALL: "grievance/get-all",
};

export const FEEDBACK_ENDPOINTS = {
  ADD: "feedback/add",
  GET_ALL: "feedback/get-all",
};

export const EVENTS_ENDPOINTS = {
  GET_ALL: "events/get-all",
  REGISTER: "events/book-event",
  STUDENT_REGISTERED: "events/get-all-registered-events",
  CREATE: "events/add",
  UPDATE: "events/update",
  DELETE: "events/delete",
};

export const COUNSELING_ENDPOINTS = {
  GET_ALL_DETAILS: "counselor/get-details",
  REGISTER_COUNSELOR: "counselor/register",
  ADD_COUNSELOR: "counselor/add-detail",
  UPDATE_COUNSELOR: "counselor/update-details",
  DELETE_COUNSELOR: "counselor/delete-details",
  GET_STUDENT_SESSIONS: "counselor/get-student-sessions",
  UPDATE_STUDENT_SESSION: "counselor/update-student-session",
};
