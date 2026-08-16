import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";


const CustomerAuthContext =
  createContext(null);


const STORAGE_KEY =
  "sriLaxmiCustomer";


function getStoredCustomer() {

  try {

    const storedCustomer =
      localStorage.getItem(STORAGE_KEY);


    if (!storedCustomer) {
      return null;
    }


    const parsedCustomer =
      JSON.parse(storedCustomer);


    if (
      !parsedCustomer ||
      !parsedCustomer.id
    ) {
      return null;
    }


    return parsedCustomer;

  } catch (error) {

    console.error(
      "Unable to load customer:",
      error
    );

    return null;
  }
}


export function CustomerAuthProvider({
  children,
}) {

  const [customer, setCustomer] =
    useState(getStoredCustomer);


  const [loading, setLoading] =
    useState(false);


  // =========================
  // SAVE CUSTOMER
  // =========================

  useEffect(() => {

    if (customer) {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(customer)
      );

    } else {

      localStorage.removeItem(
        STORAGE_KEY
      );
    }

  }, [customer]);


  // =========================
  // REGISTER
  // =========================

  async function register(
    name,
    mobile,
    email,
    password
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          "http://localhost:8081/api/auth/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              mobile,
              email,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Registration failed."
        );
      }


      return data;

    } finally {

      setLoading(false);
    }
  }


  // =========================
  // LOGIN
  // =========================

  async function login(
    email,
    password
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          "http://localhost:8081/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              password,
            }),
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Login failed."
        );
      }


      setCustomer(
        data.customer
      );


      return data;

    } finally {

      setLoading(false);
    }
  }


  // =========================
  // LOGOUT
  // =========================

  function logout() {

    setCustomer(null);
  }


  // =========================
  // AUTH STATE
  // =========================

  const isLoggedIn =
    customer !== null;


  const value = useMemo(
    () => ({
      customer,
      isLoggedIn,
      loading,
      register,
      login,
      logout,
    }),
    [
      customer,
      isLoggedIn,
      loading,
    ]
  );


  return (
    <CustomerAuthContext.Provider
      value={value}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}


export function useCustomerAuth() {

  const context =
    useContext(
      CustomerAuthContext
    );


  if (!context) {

    throw new Error(
      "useCustomerAuth must be used inside CustomerAuthProvider"
    );
  }


  return context;
}