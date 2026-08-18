package com.srilaxmi.mobiles.config;

import com.srilaxmi.mobiles.service.AdminAuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminAuthInterceptor implements HandlerInterceptor {

    private final AdminAuthService adminAuthService;

    public AdminAuthInterceptor(
            AdminAuthService adminAuthService
    ) {
        this.adminAuthService = adminAuthService;
    }

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        String method = request.getMethod();

        /*
         * Browser CORS preflight.
         * It must be allowed through without authentication.
         */
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }

        String path = request.getRequestURI();

        /*
         * Login, validate and logout must remain public.
         * They handle authentication themselves.
         */
        if (path.startsWith("/api/admin/")) {
            return true;
        }

        boolean adminRequired = false;


        // =========================================
        // PRODUCTS
        // GET = public
        // POST / PUT / DELETE = admin
        // =========================================

        if (path.startsWith("/api/products")) {

            if (
                    "POST".equalsIgnoreCase(method) ||
                    "PUT".equalsIgnoreCase(method) ||
                    "DELETE".equalsIgnoreCase(method)
            ) {
                adminRequired = true;
            }
        }


        // =========================================
        // ORDERS
        //
        // POST = customer
        // /customer/... = customer
        // GET all / GET by id = admin
        // PUT/PATCH/DELETE = admin
        // =========================================

        else if (path.startsWith("/api/orders")) {

            boolean customerOrderRequest =
                    path.startsWith(
                            "/api/orders/customer/"
                    );

            if (customerOrderRequest) {

                adminRequired = false;

            } else if (
                    "GET".equalsIgnoreCase(method) ||
                    "PUT".equalsIgnoreCase(method) ||
                    "PATCH".equalsIgnoreCase(method) ||
                    "DELETE".equalsIgnoreCase(method)
            ) {

                adminRequired = true;
            }
        }


        // =========================================
        // OFFERS
        //
        // GET = public
        // POST / PUT / DELETE = admin
        // =========================================

        else if (path.startsWith("/api/offers")) {

            if (
                    "POST".equalsIgnoreCase(method) ||
                    "PUT".equalsIgnoreCase(method) ||
                    "DELETE".equalsIgnoreCase(method)
            ) {
                adminRequired = true;
            }
        }


        // =========================================
        // REPAIR REQUESTS
        //
        // POST = customer
        // GET / PATCH / DELETE = admin
        // =========================================

        else if (
                path.startsWith(
                        "/api/repair-requests"
                )
        ) {

            if (
                    "GET".equalsIgnoreCase(method) ||
                    "PATCH".equalsIgnoreCase(method) ||
                    "PUT".equalsIgnoreCase(method) ||
                    "DELETE".equalsIgnoreCase(method)
            ) {
                adminRequired = true;
            }
        }


        if (!adminRequired) {
            return true;
        }


        // =========================================
        // CHECK ADMIN TOKEN
        // =========================================

        String authorization =
                request.getHeader("Authorization");


        if (
                authorization == null ||
                !authorization.startsWith("Bearer ")
        ) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().write(
                    "{\"message\":\"Admin authentication required.\"}"
            );

            return false;
        }


        String token =
                authorization
                        .substring(7)
                        .trim();


        if (!adminAuthService.isValidToken(token)) {

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.setContentType(
                    "application/json"
            );

            response.getWriter().write(
                    "{\"message\":\"Invalid or expired admin session.\"}"
            );

            return false;
        }


        return true;
    }
}