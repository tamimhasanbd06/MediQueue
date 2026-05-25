import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env
      .NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const saveAuthToken = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  const res = await fetch("/api/jwt", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok || !data?.token) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    return null;
  }

  localStorage.setItem("token", data.token);

  if (data?.user?.id) {
    localStorage.setItem(
      "userId",
      data.user.id
    );
  }

  return data.token;
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const {
  signIn,
  signUp,
  signOut,
  useSession,
} = authClient;
