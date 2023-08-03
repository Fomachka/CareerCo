import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
  const auth = getAuth();
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsLogged(true);
        setUser(currentUser);
      } else {
        setIsLogged(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return {
    isLoggedIn: isLogged,
    email: user.email,
    token: user.accessToken,
    id: user.uid,
    name: user.displayName,
    isLoading: isLoading,
  };
}
