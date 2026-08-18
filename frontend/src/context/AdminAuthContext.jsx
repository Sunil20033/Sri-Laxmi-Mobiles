import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminAuthContext = createContext(null);

const API_URL =
  "https://sri-laxmi-mobiles-backend.onrender.com";

const ADMIN_TOKEN_KEY = "sriLaxmiAdminToken";

export function AdminAuthProvider({ children }) {

  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(false);

  const [isCheckingAdmin, setIsCheckingAdmin] =
    useState(true);


  // =========================
  // CHECK EXISTING SESSION
  // =========================

  useEffect(() => {

    const token =
      localStorage.getItem(ADMIN_TOKEN_KEY);

    if (!token) {
      setIsCheckingAdmin(false);
      return;
    }

    fetch(`${API_URL}/api/admin/validate`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {

        if (response.ok) {
          setIsAdminLoggedIn(true);
        } else {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setIsAdminLoggedIn(false);
        }

      })
      .catch(() => {

        /*
         * Do not immediately log the admin out
         * because the Render backend may be waking up.
         *
         * The token remains stored locally.
         */
        setIsAdminLoggedIn(true);

      })
      .finally(() => {
        setIsCheckingAdmin(false);
      });

  }, []);


  // =========================
  // LOGIN
  // =========================

  async function login(username, password) {

    try {

      const response =
        await fetch(`${API_URL}/api/admin/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

      const data =
        await response.json().catch(() => ({}));


      if (!response.ok) {

        return {
          success: false,
          message:
            data.message ||
            "Invalid username or password.",
        };
      }


      if (!data.token) {

        return {
          success: false,
          message:
            "Login failed. No authentication token received.",
        };
      }


      localStorage.setItem(
        ADMIN_TOKEN_KEY,
        data.token
      );

      setIsAdminLoggedIn(true);

      return {
        success: true,
        message:
          data.message ||
          "Admin login successful.",
      };

    } catch (error) {

      return {
        success: false,
        message:
          "Unable to connect to the server. Please try again.",
      };
    }
  }


  // =========================
  // LOGOUT
  // =========================

  async function logout() {

    const token =
      localStorage.getItem(ADMIN_TOKEN_KEY);

    try {

      if (token) {

        await fetch(
          `${API_URL}/api/admin/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

    } catch (error) {

      // Logout locally even if backend is unavailable.

    }


    localStorage.removeItem(
      ADMIN_TOKEN_KEY
    );

    setIsAdminLoggedIn(false);
  }


  // =========================
  // GET ADMIN TOKEN
  // =========================

  function getAdminToken() {

    return localStorage.getItem(
      ADMIN_TOKEN_KEY
    );
  }


  const value = {
    isAdminLoggedIn,
    isCheckingAdmin,
    login,
    logout,
    getAdminToken,
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