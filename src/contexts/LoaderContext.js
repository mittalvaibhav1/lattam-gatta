import { createContext, useState } from "react";
import Loader from "../components/Loader/Loader";

export const LoaderContext = createContext();

const LoaderContextProvider = (props) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <LoaderContext.Provider value={{ setShowLoader }}>
      {showLoader && <Loader />}
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
