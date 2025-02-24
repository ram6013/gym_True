"use client";

import { register, RegisterActionState } from "@/app/(auth)/signup/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { AuthForm } from "../auth-form";
import { SubmitButton } from "../submit-button";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [isSuccessful, setIsSuccessful] = useState(false);

    const [state, formAction] = useActionState<RegisterActionState, FormData>(
        register,
        {
            status: "idle",
        }
    );

    useEffect(() => {
        if (state.status === "user_exists") {
            console.error("Account already exists");
            toast.error("Account already exists");
        } else if (state.status === "failed") {
            console.error("Failed to create account");
            toast.error("Failed to create account");
        } else if (state.status === "invalid_data") {
            console.error("Failed validating your submission!");
            toast.error("Failed validating your submission!");
        } else if (state.status === "success") {
            console.info("Account created successfully");
            setIsSuccessful(true);
            router.refresh();
        }
    }, [state, router]);

    const handleSubmit = (formData: FormData) => {
        setEmail(formData.get("email") as string);
        formAction(formData);
    };

    return (
        <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
            <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
                <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
                    <h3 className="text-xl font-semibold text-white dark:text-zinc-50">
                        Sign Up
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Create an account with your email and password
                    </p>
                </div>
                <AuthForm action={handleSubmit} defaultEmail={email}>
                    <SubmitButton isSuccessful={isSuccessful}>
                        Sign Up
                    </SubmitButton>
                    <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
                        {"Already have an account? "}
                        <Link
                            href="/login"
                            className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
                        >
                            Sign in
                        </Link>
                        {" instead."}
                    </p>
                </AuthForm>
            </div>
        </div>
    );
}
