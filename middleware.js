import { clerkMiddleware , createRouteMatcher} from "@clerk/nextjs/server";



export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/forum(.*)',
  ]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  });