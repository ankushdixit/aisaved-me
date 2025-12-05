import Link from "next/link";

interface ErrorPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

export const metadata = {
  title: "Authentication Error | AI Saved Me",
  description: "An error occurred during authentication",
};

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "You do not have permission to sign in.",
  Verification: "The verification link may have expired or already been used.",
  OAuthSignin: "Error occurred while trying to sign in with OAuth provider.",
  OAuthCallback: "Error occurred during OAuth callback.",
  OAuthCreateAccount: "Could not create OAuth provider user in the database.",
  EmailCreateAccount: "Could not create email provider user in the database.",
  Callback: "Error occurred during the callback.",
  OAuthAccountNotLinked:
    "This email is already associated with a different account. Try signing in with the original method.",
  EmailSignin: "Error sending the verification email.",
  CredentialsSignin: "Invalid email or password. Please try again.",
  SessionRequired: "Please sign in to access this page.",
  Default: "An unexpected error occurred. Please try again.",
};

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const error = params.error ?? "Default";
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-black bg-[#FF1493] shadow-memphis-lg">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="mb-4 text-3xl font-display font-bold text-black">Authentication Error</h1>
        <p className="mb-8 text-gray-600">{errorMessage}</p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/auth/signin"
            className="inline-block rounded-lg border-3 border-black bg-[#0066FF] px-8 py-3 font-display font-bold text-white shadow-memphis-md transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000000]"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block rounded-lg border-3 border-black bg-white px-8 py-3 font-display font-bold text-black shadow-memphis-md transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000000]"
          >
            Go Home
          </Link>
        </div>

        {/* Debug Info (only shown in development) */}
        {process.env.NODE_ENV === "development" && error !== "Default" && (
          <div className="mt-8 rounded-lg border-2 border-gray-300 bg-gray-100 p-4 text-left">
            <p className="text-xs font-mono text-gray-500">Error code: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
