"use client"

import { z } from "zod";
import { useState } from "react"
import { SignUpForm } from "../components/sign-up-form";
import { registerSchema } from "../../schema";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OtpForm } from "../components/otp-form";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import toast from "react-hot-toast";

export const SignUpView = () => {

    const [showOtp, setShowOtp] = useState(false);
    const [userData, setUserData] = useState<z.infer<typeof registerSchema>>({
        email: "",
        phone: "",
        password: "",
        username: "",
        store: ""
    });
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(60);

    const router = useRouter();

    const startResendTimer = () => {
        setCanResend(false);
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                };
                return prev - 1;
            });
        }, 1000);
    };

    const handleSignUpSuccess = (data: z.infer<typeof registerSchema>) => {
        setUserData(data);
        setShowOtp(true);
        startResendTimer();
    }

    const handleOTPSuccess = () => {
        router.push("/admin");
    };

    const trpc = useTRPC();

    const resendMutation = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("OTP has been resent to your email");
            startResendTimer();
        }
    }));

    const handleResendOTP = () => {
        if (userData.email) {
            resendMutation.mutate(userData);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen container mx-auto md:px-6">
            <div className="flex flex-col flex-1">
                <div className="flex-1 flex items-center justify-center p-4 md:p-8">
                    <div className="w-full max-w-md">
                        {!showOtp ? (
                            <Card className="border border-muted/30 bg-background/80 backdrop-blur-sm">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                                    <CardDescription>
                                        Enter your information to create your account.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SignUpForm onSuccess={handleSignUpSuccess} />
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-4">
                                    <div className="text-center text-sm">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-primary hover:underline" prefetch>
                                            Login
                                        </Link>
                                    </div>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="border-muted/30 bg-background/80 backdrop-blur-sm">
                                <CardHeader className="space-y-1">
                                    <CardTitle className="text-2xl font-bold text-center">Enter the OTP</CardTitle>
                                    <CardDescription className="text-center">
                                        We&apos;ve sent a verification code to {userData.email}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <OtpForm
                                        userData={userData}
                                        onSuccess={handleOTPSuccess}
                                        canResend={canResend}
                                        timer={timer}
                                        onResend={handleResendOTP}
                                        isResending={resendMutation.isPending}
                                    />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}