import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { transferReducer, initialTransferState } from "../model/transferReducer";
import { TransferAction, TransferState } from "../model/transferTypes";

type TransferContextType = {
  state: TransferState;
  dispatch: Dispatch<TransferAction>;
};

const TransferContext = createContext<TransferContextType | undefined>(undefined);

export const TransferProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(transferReducer, initialTransferState);
  return (
    <TransferContext.Provider value={{ state, dispatch }}>
      {children}
    </TransferContext.Provider>
  );
};
export const useTransferContext = () => {
  const context = useContext(TransferContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
