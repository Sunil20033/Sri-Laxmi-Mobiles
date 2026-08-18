import axios from "axios";

const ADMIN_TOKEN_KEY =
  "sriLaxmiAdminToken";


// =========================
// GET ADMIN TOKEN
// =========================

export function getAdminToken() {

  return localStorage.getItem(
    ADMIN_TOKEN_KEY
  );
}


// =========================
// ADMIN FETCH HEADERS
// =========================

export function getAdminHeaders(
  extraHeaders = {}
) {

  const token =
    getAdminToken();

  return {
    ...extraHeaders,

    ...(token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {}),
  };
}


// =========================
// ADMIN FETCH
// =========================

export async function adminFetch(
  url,
  options = {}
) {

  const response =
    await fetch(
      url,
      {
        ...options,

        headers:
          getAdminHeaders(
            options.headers || {}
          ),
      }
    );


  if (response.status === 401) {

    localStorage.removeItem(
      ADMIN_TOKEN_KEY
    );

    window.location.href =
      "/admin/login";
  }


  return response;
}


// =========================
// ADMIN AXIOS
// =========================

export const adminAxios =
  axios.create();


adminAxios.interceptors.request.use(
  (config) => {

    const token =
      getAdminToken();


    if (token) {

      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }


    return config;
  }
);


// =========================
// AXIOS 401 HANDLER
// =========================

adminAxios.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response &&
      error.response.status === 401
    ) {

      localStorage.removeItem(
        ADMIN_TOKEN_KEY
      );

      window.location.href =
        "/admin/login";
    }


    return Promise.reject(error);
  }
);