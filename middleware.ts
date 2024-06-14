import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public Routes
const isPublicRoute = createRouteMatcher(["/"]);

// Clerk Middleware for Protected Routes
export default clerkMiddleware((auth, request) => {
  // Protect public routes
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
