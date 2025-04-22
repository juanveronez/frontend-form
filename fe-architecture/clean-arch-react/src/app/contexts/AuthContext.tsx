import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../../infra/supabase/config";

interface IAuthContext {
  logout: () => Promise<void>;
  session: Session | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("getSession", session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", session);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
