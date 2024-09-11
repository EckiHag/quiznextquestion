// hooks/useAdmin.ts

import { useEffect, useState } from 'react';
import { useSession, getSession } from 'next-auth/react'; // next-auth Funktionen

export const useAdmin = () => {
  const { data: session, status } = useSession(); // holt die Session-Daten
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const updatedSession = await getSession(); // Session manuell aktualisieren
      if (status === 'authenticated' && updatedSession?.user?.role === 'ADMIN') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    if (status === 'authenticated') {
      checkAdmin(); // Überprüft Admin-Status bei jeder Änderung der Session
    } else {
      setIsAdmin(false);
    }
  }, [session, status]);

  return { isAdmin, loading: status === 'loading' };
};





// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react'; // Falls du next-auth benutzt

// export const useAdmin = () => {
//   const { data: session, status } = useSession(); // holt die Session-Daten
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     if (status === 'authenticated' && session?.user.role === 'ADMIN') {
//       setIsAdmin(true);
//     } else {
//       setIsAdmin(false);
//     }
//   }, [session, status]);

//   return { isAdmin, loading: status === 'loading' };
// };
