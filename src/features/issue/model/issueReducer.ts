import { IssueState, IssueAction, IssueStepType, IssueActionTypes } from "./issueTypes";

const steps: IssueStepType[] = [
  "select_user",
  "review_document",
  "sign_document",
];
export const initialIssueState: IssueState = {
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
  deviceIssueData: {
    userId: "",
    processId: "",
    devices: [],
  }
};

export function issueReducer(
  state: IssueState,
  action: IssueAction
): IssueState {
  switch (action.type) {
    case IssueActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case IssueActionTypes.SET_USERS:
      return { ...state, users: action.payload };  
    case IssueActionTypes.NEXT_STEP: {
      const currentStep = steps.indexOf(state.step);
      const nextStep = steps[currentStep + 1] ?? currentStep;
      return { ...state, step: nextStep };
    }
    case IssueActionTypes.PREV_STEP: {
      const currentStep = steps.indexOf(state.step);
      const prevStep = steps[currentStep - 1] ?? currentStep;
      return { ...state, step: prevStep };
    }
    case IssueActionTypes.SET_ISSUE_ID:
      return {
        ...state,
        issueId: action.payload,
      };
    case IssueActionTypes.RESET: {
      return {
        ...state,
        user: null,
        step: steps[0],
        issueId: null,
      };
    }
    case IssueActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case IssueActionTypes.RESET_ERROR:
      return { ...state, errors: {} };
    case IssueActionTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case IssueActionTypes.SET_USERS_LIST_VISIBLE:
      return { ...state, isUsersListVisible: action.payload };
    case IssueActionTypes.SET_WAS_SEARCHED:
          return { ...state, wasSearched: action.payload };
    case IssueActionTypes.SET_FULL_RESET:
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
