import {
  IssueState,
  IssueAction,
  IssueStepType,
  IssueActionTypes,
  IssueStepTitle,
} from "./issueTypes";

const steps: IssueStepType[] = [
  "select_warehouse",
  "select_user",
  "review_document",
  "sign_document",
];
const titles: IssueStepTitle[] = [
  "Выбор склада",
  "Выбор пользователя",
  "Выбор оборудования",
  "Подпись документа",
]
export const initialIssueState: IssueState = {
  step: "select_warehouse",
  title: 'Выбор склада',
  issueId: null,
  errors: {},
  userQuery: "",
  deviceQuery: "",
  isUsersListVisible: false,
  isDevicesListVisible: false,
  devicesLoaded: false,
  wasSearched: false,
  warehouse: {
    id: "",
    name: "",
    slug: "",
  },
  warehouses: [],
  deviceIssueData: {
    userId: "",
    processId: "",
    devices: [],
  },
  assignedDevices: [],
};

export function issueReducer(
  state: IssueState,
  action: IssueAction
): IssueState {
  switch (action.type) {
    case IssueActionTypes.NEXT_STEP: {
      const currentStep = steps.indexOf(state.step);
      const nextStep = steps[currentStep + 1] ?? currentStep;
      const currentTitle = titles.indexOf(state.title);
      const nextTitle = titles[currentTitle + 1] ?? currentTitle;
      return {
         ...state, 
        step: nextStep,
        title: nextTitle,
       };
    }
    case IssueActionTypes.PREV_STEP: {
      const currentStep = steps.indexOf(state.step);
      const prevStep = steps[currentStep - 1] ?? currentStep;
      const currentTitle = titles.indexOf(state.title);
      const prevTitle = titles[currentTitle - 1] ?? currentTitle;
      return { 
        ...state, 
        step: prevStep,
        title: prevTitle,
       };
    }
    case IssueActionTypes.SET_STEP:
      return {
        ...state,
        step: action.payload
      }
      case IssueActionTypes.RESET_STEP:
        return {
          ...state,
          step: "select_warehouse"
        }
    case IssueActionTypes.SET_ISSUE_ID:
      return {
        ...state,
        issueId: action.payload,
      };
    case IssueActionTypes.SET_ASSIGNED_DEVICES: {
      const existingIds = new Set(state.assignedDevices.map((item) => item.id));
      const newDevices = action.payload.filter(
        (item) => !existingIds.has(item.id)
      );
      return {
        ...state,
        assignedDevices: [...state.assignedDevices, ...newDevices],
      };
    }

    case IssueActionTypes.RESET: {
      return {
        ...state,
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
    case IssueActionTypes.SET_USER_QUERY:
      return { ...state, userQuery: action.payload };
    case IssueActionTypes.RESET_USER_QUERY:
      return { ...state, userQuery: "" };
    case IssueActionTypes.SET_DEVICE_QUERY:
      return { ...state, deviceQuery: action.payload };
    case IssueActionTypes.SET_DEVICES_LOADED:
      return { ...state, devicesLoaded: action.payload };
    case IssueActionTypes.RESET_DEVICE_QUERY:
      return { ...state, deviceQuery: "" };
    case IssueActionTypes.SET_USERS_LIST_VISIBLE:
      return { ...state, isUsersListVisible: action.payload };
    case IssueActionTypes.SET_DEVICES_LIST_VISIBLE:
      return { ...state, isDevicesListVisible: action.payload };
    case IssueActionTypes.SET_WAS_SEARCHED:
      return { ...state, wasSearched: action.payload };
    case IssueActionTypes.SET_FULL_RESET:
      return {
        ...state,
        step: steps[0],
        issueId: null,
        errors: {},
        userQuery: "",
        deviceQuery: "",
        isUsersListVisible: false,
        wasSearched: false,
      };
    case IssueActionTypes.SET_DEVICE_ID: {
      const exists = state.deviceIssueData.devices.includes(action.payload);
      return {
        ...state,
        deviceIssueData: {
          ...state.deviceIssueData,
          devices: exists
            ? state.deviceIssueData.devices
            : [...state.deviceIssueData.devices, action.payload],
        },
      };
    }
    case IssueActionTypes.DELETE_DEVICE:
      return {
        ...state,
        deviceIssueData: {
          ...state.deviceIssueData,
          devices: state.deviceIssueData.devices.filter((item) => item !== action.payload)
        },
        assignedDevices: state.assignedDevices.filter((item) => item.id !== action.payload)
      }
    case IssueActionTypes.SET_WAREHOUSE:
      return { ...state, warehouse: action.payload };
    case IssueActionTypes.RESET_WAREHOUSE:
      return {
        ...state,
        warehouse: { ...initialIssueState.warehouse },
      };
    case IssueActionTypes.SET_WAREHOUSES:
      return { ...state, warehouses: action.payload };
    case IssueActionTypes.RESET_WAREHOUSES:
      return { ...state, warehouses: [] };
    case IssueActionTypes.RESET_DEVICE_ISSUE_DATA:
      return {
        ...state, 
        deviceIssueData: {...initialIssueState.deviceIssueData },
        assignedDevices: [],
      }
    default:
      return state;
  }
}
