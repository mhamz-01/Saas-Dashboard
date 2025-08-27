"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // fetch employee details using user.id (foreign key)
        const { data: employee, error } = await supabase
          .from("employees")
          .select("emp_name, emp_designation, emp_hierarchylevel")
          .eq("user_id", user.id) // id is FK in employees
          .single();

        if (error) {
          console.error("Error fetching employee details:", error.message);
        }

        setUser({
          id: user.id,
          email: user.email,
          ...employee, // attach employee details
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getUser();

    // listen for auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) {
          setUser(null);
        } else {
          getUser();
        }
      }
    );

    return () => subscription?.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
