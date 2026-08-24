export type SignInErrorCopy = {
  title: string;
  body: string;
};

/**
 * Turn raw Supabase / network sign-in errors into clear, helpful copy.
 */
export function mapSignInError(message: string): SignInErrorCopy {
  const m = message.toLowerCase();

  if (m.includes("email not confirmed") || m.includes("email_not_confirmed")) {
    return {
      title: "Confirm your email to continue",
      body: "Check your inbox (and spam) for the Kanam confirmation link, open it once, then sign in again.",
    };
  }

  if (
    m.includes("invalid login") ||
    m.includes("invalid credentials") ||
    m.includes("invalid_credentials")
  ) {
    return {
      title: "We couldn’t sign you in",
      body: "That email and password don’t match an account. Double-check both, or use Forgot password to set a new one.",
    };
  }

  if (m.includes("too many") || m.includes("rate limit") || m.includes("over_request")) {
    return {
      title: "Too many sign-in attempts",
      body: "Please wait a minute, then try again. If you’re locked out, use Forgot password.",
    };
  }

  if (m.includes("network") || m.includes("failed to fetch") || m.includes("load failed")) {
    return {
      title: "Connection issue",
      body: "We couldn’t reach Kanam just now. Check your internet connection and try again.",
    };
  }

  if (m.includes("demo mode")) {
    return {
      title: "Sign-in unavailable",
      body: "Account sign-in isn’t available in this environment. Try again from the live app.",
    };
  }

  return {
    title: "Sign-in didn’t work",
    body: message.trim() || "Something went wrong. Please try again in a moment.",
  };
}

export function errorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}
