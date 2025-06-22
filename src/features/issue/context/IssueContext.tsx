import {
  createContext,
  useContext,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";
import { IssueAction, IssueState, IssueStepType } from "../model/issueTypes";
import { useIssue } from "../model/useIssue";
import { Device } from "../../../types/devices";
import { Warehouse } from "../../../types/locations";

type IssueContextType = {
  state: IssueState;
  dispatch: Dispatch<IssueAction>;
  actions: {
    handleDeviceIssue: (id: string) => Promise<void>;
    handleUserChange: (value: string) => void;
    handleFullReset: () => void;
    handleSetUser: (id: string) => Promise<void>;
    handleResetUser: () => void;
    handleResetUserQuery: () => void;
    handleSetStepInfo: (step: IssueStepType) => void;
    handleNextStep: () => void;
    handleStartDeviceIssueWith: (id: string) => void;
    handleGetDevice: () => void;
    handleDeviceChange: (value: string) => void;
    handleSetDevice: (item: Device) => void;
    handleSetWarehouse: (item: Warehouse) => void;
    handleGetWarehousesByUser: (id: string) => void;
    handleResetDeviceQuery: () => void;
    handleDeleteDevice: (id: string) => void;
    handleResetIssueDevices: () => void;
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
