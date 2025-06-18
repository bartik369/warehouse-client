import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";
import { IssueAction, IssueState } from "../model/issueTypes";
import { useIssue } from "../model/useIssue";
import { User } from "../../../types/user";

type IssueContextType = {
  state: IssueState;
  dispatch: Dispatch<IssueAction>;
  actions: {
    handleDeviceIssue: (id: string) => Promise<void>;
    handleUserChange: (field: keyof User, value: string) => void;
    handleReset: () => void;
    handleSetUser: (id: string) => Promise<void>;
    handleSetStepInfo: (step: string) => void;
    handleStartDeviceIssueWith: (id: string) => void;
    handleGetDevice: (query: string) => void;
    handleDeviceChange: (value: string) => void;
  };
  isSuccess: boolean;
  isFetching: boolean;
};

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider = ({ children, initialDeviceId }: { children: ReactNode, initialDeviceId?: string }) => {
  const value = useIssue();
  
  useEffect(() => {
    if (initialDeviceId) {
      value.actions.handleStartDeviceIssueWith(initialDeviceId);
    }
  }, [initialDeviceId]);
  
  return (
    <IssueContext.Provider value={value}>
      {children}
    </IssueContext.Provider>
  );
};
export const useIssueContext = () => {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
