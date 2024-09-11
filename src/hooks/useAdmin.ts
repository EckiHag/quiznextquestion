// hooks/useAdmin.ts
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Falls du next-auth benutzt

export const useAdmin = () => {
  const { data: session, status } = useSession(); // holt die Session-Daten
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === 'authenticated' && session?.user.role === 'ADMIN') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, status]);

  return { isAdmin, loading: status === 'loading' };
};
