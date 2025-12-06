import { Suspense } from "react";
import { AuthLayout, SignInForm } from "@/components/auth";

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
    error?: string;
  }>;
}

export const metadata = {
  title: "Sign In | AI Saved Me",
  description: "Sign in to share or read AI success stories",
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/";
  const error = params.error ?? null;

  return (
    <AuthLayout variant="signin">
      <Suspense fallback={<SignInFormSkeleton />}>
        <SignInForm callbackUrl={callbackUrl} error={error} />
      </Suspense>
    </AuthLayout>
  );
}

function SignInFormSkeleton() {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="mb-8 text-center">
        <div className="mx-auto h-8 w-48 rounded bg-gray-200" />
        <div className="mx-auto mt-2 h-4 w-64 rounded bg-gray-100" />
      </div>
      <div className="h-14 w-full rounded-lg bg-gray-200" />
      <div className="my-6 h-px bg-gray-200" />
      <div className="space-y-5">
        <div className="h-14 w-full rounded-lg bg-gray-100" />
        <div className="h-14 w-full rounded-lg bg-gray-100" />
        <div className="h-14 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
