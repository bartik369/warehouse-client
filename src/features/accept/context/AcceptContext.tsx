import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import { acceptReducer, initialAcceptState } from "../model/acceptReducer";
import { AcceptAction, AcceptState } from "../model/acceptTypes";

type AcceptContextType = {
  state: AcceptState;
  dispatch: Dispatch<AcceptAction>;
};

const AcceptContext = createContext<AcceptContextType | undefined>(undefined);

export const AcceptProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(acceptReducer, initialAcceptState);
  return (
    <AcceptContext.Provider value={{ state, dispatch }}>
      {children}
    </AcceptContext.Provider>
  );
};
export const useAcceptContext = () => {
  const context = useContext(AcceptContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};
