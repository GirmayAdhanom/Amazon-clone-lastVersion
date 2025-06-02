import { ToastContainer } from "react-toastify";
import Router from "./Router"
import { useContext, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { DataContext } from "./components/Context/Context";
import { Type } from "./Utility/action.type";

function App() {
  const [user, dispatch] = useContext(DataContext);

  useEffect(() => { 
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: Type.SET_USER,
          user: user,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        });
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App