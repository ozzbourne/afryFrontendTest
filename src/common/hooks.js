import { useEffect, useState } from 'react';
import db from '../config/firebaseConfig';

export const useSubscribeToDatabaseCollection = (databaseCollection) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db.collection(databaseCollection).onSnapshot((snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setData(fetchedData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [databaseCollection]);

  return { data, loading };
};
