"use server";
import { loginUser, registerUser } from "@/api/users/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const config = {
	maxAge: 60 * 60 * 24 * 7, // 1 week
	path: "/",
	domain: process.env.HOST ?? "localhost",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
};

export const login = async (email: string, password: string) => {
	// Call the API function
	const responseData = await loginUser(email, password);

	// Check if there's no response or an error returned from Strapi
	if (!responseData) {
		return {
			strapiErrors: "Unknown error occurred, please try again.",
			zodErrors: null,
			message: "An unexpected error occurred.",
		};
	}

	// If the API returns an error (like "Invalid identifier or password")
	if (responseData?.errors) {
		return {
			strapiErrors: responseData.error, // Extract the specific Strapi error message
			zodErrors: null,
			message: "in valid identifier or password.",
		};
	}

	// If JWT is present, set the cookie and redirect
	const { jwt } = responseData;

	cookies().set("jwt", jwt, config); // Store the token in the cookie
	redirect("/"); // Redirect after successful login
};
export const logoutUser = () => {
	cookies().set("jwt", "", { ...config, maxAge: 0 });
	redirect("/login");
};

export const register = async (
	username: string,
	email: string,
	password: string
) => {
	const responseData = await registerUser(username, email, password);
	if (!responseData) {
		return {
			strapiErrors: "Unknown error occurred, please try again.",
			zodErrors: null,
			message: "An unexpected error occurred.",
		};
	}

	// If the API returns an error (like "Invalid identifier or password")
	if (responseData?.errors) {
		return {
			strapiErrors: responseData.error, // Extract the specific Strapi error message
			zodErrors: null,
			message: responseData.errors,
		};
	}

	// If JWT is present, set the cookie and redirect
	const { jwt } = responseData;

	cookies().set("jwt", jwt, config); // Store the token in the cookie
	redirect("/"); // Redirect after successful login
};
