import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { otpSchema, registerSchema } from "../../schema";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import toast from "react-hot-toast";

interface Props {
    userData: z.infer<typeof registerSchema>;
    onSuccess: () => void;
    onBack: () => void;
    canResend: boolean;
    timer: number;
    onResend: () => void;
    isResending?: boolean;
}

export const OtpForm = ({ userData, onResend, onSuccess, onBack, timer, canResend, isResending }: Props) => {

    const [otpValue, setOtpValue] = useState("");

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: ''
        }
    });

    const trpc = useTRPC();
    const queryClient = useQueryClient();

    const verifyMutation = useMutation(trpc.auth.verify.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
            onSuccess();
        }
    }))

    const onSubmit = (data: z.infer<typeof otpSchema>) => {
        verifyMutation.mutate({
            ...userData,
            otp: data.otp
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    name="otp"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormControl>
                                    <div className="relative flex items-center justify-center flex-col">
                                        <InputOTP
                                            maxLength={6}
                                            value={otpValue}
                                            onChange={(value) => {
                                                setOtpValue(value);
                                                field.onChange(value);
                                            }}
                                        >
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </FormControl>
                                <div className="flex justify-center">
                                    <FormMessage />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="space-y-3">
                    <Button type="submit" className="w-full cursor-pointer" disabled={verifyMutation.isPending || otpValue.length < 6}>
                        {verifyMutation.isPending ? (
                            <div className="flex items-center">
                                Verifying...
                                <Loader className="ml-2 h-4 w-4 animate-spin" />
                            </div>
                        ) : (
                            <div className="flex items-center">
                                Verify
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        )}
                    </Button>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <span>Didn&apos;t receive the code?</span>
                        {canResend ? (
                            <button
                                type="button"
                                onClick={onResend}
                                disabled={isResending}
                                className="font-medium text-primary hover:underline disabled:opacity-50 cursor-pointer"
                            >
                                {isResending ? "Resending..." : "Resend OTP"}
                            </button>
                        ) : (
                            <span className="font-medium text-foreground">Resend in {timer}s</span>
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full cursor-pointer"
                        onClick={onBack}
                        disabled={verifyMutation.isPending}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to details
                    </Button>
                </div>
            </form>
        </Form>
    )
}