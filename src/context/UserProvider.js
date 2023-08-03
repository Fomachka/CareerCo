import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);
  const [validatingUser, setValidatingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(false);
      setValidatingUser(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        validatingUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
