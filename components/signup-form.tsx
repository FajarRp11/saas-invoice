import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInWithGoogle, signUpCredentials } from "@/app/actions/auth";
import { useActionState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { InfoIcon, X } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction, isPending] = useActionState(signUpCredentials, null);
  const fieldErrors = typeof state?.error == "object" ? state.error.fieldErrors : null;
  return (
    <form action={formAction} className="p-6 md:p-8">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        {state?.message ?
          <Alert className="bg-red-100 border-red-300 text-red-700">
            <InfoIcon />
            <AlertTitle>Failed to register</AlertTitle>
            <AlertDescription>
              {state?.message}
            </AlertDescription>
          </Alert> : null}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
          <FieldError>{fieldErrors?.name}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            required
            className="bg-background"
          />
          <FieldError>{fieldErrors?.email}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
          <FieldError>{fieldErrors?.password}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            className="bg-background"
          />
          <FieldError>{fieldErrors?.confirmPassword}</FieldError>
        </Field>
        <Field>
          <Button type="submit" disabled={isPending}>{isPending ? "Creating your account..." : "Create Account"}</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button onClick={signInWithGoogle} variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Sign up with Google
          </Button>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
