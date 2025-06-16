import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
} from "react";
import { IssueAction, IssueState } from "../model/issueTypes";
import { useIssue } from "../model/useIssue";
import { User } from "../../../types/user";

type IssueContextType = {
  state: IssueState;
  dispatch: Dispatch<IssueAction>;
  actions: {
    handleDeviceIssue: (id: string) => Promise<void>;
    handleInputChange: (field: keyof User, value: string) => void;
    handleReset: () => void;
    handleSetUser: (id: string) => Promise<void>;
    handleSetStepInfo: (step: string) => void;
  };
  isSuccess: boolean;
  isFetching: boolean;
};

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider = ({ children }: { children: ReactNode }) => {

  const value = useIssue()
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
