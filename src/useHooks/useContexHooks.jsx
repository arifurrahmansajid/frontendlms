import { useContext } from "react";
import { Context } from "../Sharecomponent/AuthProvider";

const useContexHooks = () => {
  const auth = useContext(Context);
  return auth;
};

export default useContexHooks;
