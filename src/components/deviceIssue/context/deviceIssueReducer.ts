import {
  DeviceIssueAction,
  DeviceIssueActionTypes,
  DeviceIssueStepType,
  IDeviceIssueState,
} from "./deviceIssueTypes";

const steps: DeviceIssueStepType[] = [
  "select_user",
  "review_document",
  "sign_document",
];
export const initialState: IDeviceIssueState = {
  user: {
    id: "",
    userName: "",
    email: "",
    workId: "",
    firstNameRu: "",
    lastNameRu: "",
    firstNameEn: "",
    lastNameEn: "",
    isActive: true,
    department: "",
    departmentId: "",
    location: "",
    locationId: "",
  },
  users: [],
  step: "select_user",
  issueId: null,
  errors: {},
  query: "",
  isUsersListVisible: false,
  wasSearched: false,
};

export function deviceIssueReducer(
  state: IDeviceIssueState,
  action: DeviceIssueAction
): IDeviceIssueState {
  switch (action.type) {
    case DeviceIssueActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case DeviceIssueActionTypes.SET_USERS:
      return { ...state, users: action.payload };  
    case DeviceIssueActionTypes.NEXT_STEP: {
      const currentStep = steps.indexOf(state.step);
      const nextStep = steps[currentStep + 1] ?? currentStep;
      return { ...state, step: nextStep };
    }
    case DeviceIssueActionTypes.PREV_STEP: {
      const currentStep = steps.indexOf(state.step);
      const prevStep = steps[currentStep - 1] ?? currentStep;
      return { ...state, step: prevStep };
    }
    case DeviceIssueActionTypes.SET_ISSUE_ID:
      return {
        ...state,
        issueId: action.payload,
      };
    case DeviceIssueActionTypes.RESET: {
      return {
        ...state,
        user: null,
        step: steps[0],
        issueId: null,
      };
    }
    case DeviceIssueActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case DeviceIssueActionTypes.RESET_ERROR:
      return { ...state, errors: {} };
    case DeviceIssueActionTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case DeviceIssueActionTypes.SET_USERS_LIST_VISIBLE:
      return { ...state, isUsersListVisible: action.payload };
    case DeviceIssueActionTypes.SET_WAS_SEARCHED:
          return { ...state, wasSearched: action.payload };
    case DeviceIssueActionTypes.SET_FULL_RESET:
      return {
        ...state,
        user: null,
        users: [],
        step: steps[0],
        issueId: null,
        errors: {},
        query: '',
        isUsersListVisible: false,
        wasSearched: false,
      }
    default:
      return state;
  }
}
