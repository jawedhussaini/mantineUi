import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/Data/Service/getUserMe";

export async function middleware(request: NextRequest) {
	const user = await getUserMeLoader();

	const currentPath = request.nextUrl.pathname;

	// Allow access to the login route and any other public routes
	if (currentPath.startsWith("/login")) {
		return NextResponse.next();
	}

	// If the user is not logged in and is trying to access protected routes like / or /dashboard
	if (
		user &&
		(currentPath === "/" || currentPath.startsWith("/dashboard")) &&
		user.ok === false
	) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Allow access to other routes (public routes)
	return NextResponse.next();
}
