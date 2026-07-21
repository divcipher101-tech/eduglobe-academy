import type { NextAuthConfig } from "next-auth";

/**
 * NextAuth configuration (Edge compatible)
 * This file is used in the middleware where Node.js APIs (like Prisma) are not available.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page on error
    verifyRequest: "/verify-email", 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
      const isAuthRoute = 
        nextUrl.pathname.startsWith("/login") || 
        nextUrl.pathname.startsWith("/register") || 
        nextUrl.pathname.startsWith("/forgot-password") ||
        nextUrl.pathname.startsWith("/verify-email");

      // List of protected routes (by prefix)
      const isProtectedRoute = 
        nextUrl.pathname.startsWith("/student") ||
        nextUrl.pathname.startsWith("/tutor") ||
        nextUrl.pathname.startsWith("/parent") ||
        nextUrl.pathname.startsWith("/admin") ||
        nextUrl.pathname.startsWith("/manager");

      if (isApiAuthRoute) {
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          // Default redirect after login - ideally based on role, handled in the login component
          return Response.redirect(new URL("/dashboard", nextUrl)); 
        }
        return true;
      }

      if (isProtectedRoute) {
        if (!isLoggedIn) return false;
        return true; // Actual role-based authorization will be handled in layouts/pages
      }

      return true; // Allow public routes
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.name?.split(" ")[0] || "User";
        token.role = (user as { roles?: string[] }).roles?.[0] || "STUDENT";
      }
      if (trigger === "update" && session) {
        // Handle session updates
      }
      return token;
    },
    session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // Providers are added in auth.ts
} satisfies NextAuthConfig;
