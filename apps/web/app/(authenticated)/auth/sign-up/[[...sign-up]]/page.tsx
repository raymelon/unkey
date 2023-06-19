"use client";
import * as React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { EmailSignUp } from "../email-signup";
import { OAuthSignUp } from "../oauth-signup";
import { EmailCode } from "../email-code";
export const runtime = "edge";

export default function AuthenticationPage() {
  const router = useRouter();

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }
  if (isSignedIn) {
    router.push("/app");
    return null;
  }
  const [verify, setVerify] = React.useState(false);
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 px-2 md:px-0 sm:w-[500px]">
      {!verify && (
        <>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Sign Up to Unkey</h1>
            <p className="text-md text-muted-foreground">Enter your email below to sign up</p>
          </div>
          <div className="grid gap-6">
            <EmailSignUp verification={setVerify} />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <OAuthSignUp />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              Already been here before? Just{" "}
              <a className="text-black" href="/auth/sign-in">
                Sign In
              </a>
            </span>
          </div>
        </>
      )}
      {verify && (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Enter your email code</h1>
          <p className="text-md text-muted-foreground">We sent you a 6 digit code to your email</p>
          <EmailCode />
        </div>
      )}
    </div>
  );
}
