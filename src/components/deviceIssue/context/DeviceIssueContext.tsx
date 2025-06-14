import React, { createContext, useContext } from "react";
import { IDeviceIssueState, DeviceIssueAction } from "./deviceIssueTypes";

type DeviceIssueContextType = {
  state: IDeviceIssueState;
  dispatch: React.Dispatch<DeviceIssueAction>;
};

const DeviceIssueContext = createContext<DeviceIssueContextType | undefined>(
  undefined
);

export const DeviceIssueProvider = ({
  children,
  state,
  dispatch,
}: {
  children: React.ReactNode;
  state: IDeviceIssueState;
  dispatch: React.Dispatch<DeviceIssueAction>;
}) => {
    return (
        <DeviceIssueContext.Provider value={{ state, dispatch }}>
            {children}
        </DeviceIssueContext.Provider>
    )
};

export const useDeviceIssueContext = () => {
    const context = useContext(DeviceIssueContext);
    if(!context) throw new Error('some error')
        return context;
}
