import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const useCollection = (database) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    let ref = collection(db, database);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setUsers(results);
    });

    return () => unsub();
  }, [database]);

  return { users };
};
