
import {
  createContext,
  useContext,
  useState,
} from "react";

const AdminAuthContext = createContext(null);


// =========================
// ADMIN CREDENTIALS
// =========================

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


// =========================
// AUTH PROVIDER
// =========================

export function AdminAuthProvider({ children }) {

  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(
      () =>
        localStorage.getItem(
          "sriLaxmiAdminLoggedIn"
        ) === "true"
    );


  // =========================
  // LOGIN
  // =========================

  function login(username, password) {

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {

      localStorage.setItem(
        "sriLaxmiAdminLoggedIn",
        "true"
      );

      setIsAdminLoggedIn(true);

      return true;
    }


    return false;
  }


  // =========================
  // LOGOUT
  // =========================

  function logout() {

    localStorage.removeItem(
      "sriLaxmiAdminLoggedIn"
    );

    setIsAdminLoggedIn(false);
  }


  const value = {
    isAdminLoggedIn,
    login,
    logout,
  };


  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}


// =========================
// CUSTOM HOOK
// =========================

export function useAdminAuth() {

  const context =
    useContext(AdminAuthContext);


  if (!context) {

    throw new Error(
      "useAdminAuth must be used inside AdminAuthProvider"
    );
  }


  return context;
}