import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLogged(true);
        setUser(currentUser);
      } else {
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    isLoggedIn: isLogged,
    email: user.email,
    token: user.accessToken,
    id: user.uid,
    name: user.displayName,
  };
}
