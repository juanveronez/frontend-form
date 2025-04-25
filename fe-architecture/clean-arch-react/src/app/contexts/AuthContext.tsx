import { Session } from "@supabase/supabase-js";
import { createContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "../../infra/supabase/config";

interface IAuthContext {
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  session: Session | null;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session))
      .finally(() => setLoading(false));

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

  const login = async (email: string, password: string) => {
    const credentials = { email, password };
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, logout, login }}>
      {loading ? "carregando..." : children}
    </AuthContext.Provider>
  );
};
