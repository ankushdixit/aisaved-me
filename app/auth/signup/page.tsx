import { Suspense } from "react";
import { AuthLayout, SignUpForm } from "@/components/auth";

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export const metadata = {
  title: "Create Account | AI Saved Me",
  description: "Join our community of AI success stories",
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/";

  return (
    <AuthLayout variant="signup">
      <Suspense fallback={<SignUpFormSkeleton />}>
        <SignUpForm callbackUrl={callbackUrl} />
      </Suspense>
    </AuthLayout>
  );
}

function SignUpFormSkeleton() {
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
        <div className="h-14 w-full rounded-lg bg-gray-100" />
        <div className="h-14 w-full rounded-lg bg-gray-100" />
        <div className="h-14 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
