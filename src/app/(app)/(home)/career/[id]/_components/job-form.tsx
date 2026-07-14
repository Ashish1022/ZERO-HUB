"use client"

import { useForm } from "react-hook-form"
import { z } from 'zod';
import { jobApplicationSchema } from "./schema";
import toast from "react-hot-toast";
import { FileText, Loader, Upload, X } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export const JobForm = () => {

    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof jobApplicationSchema>>({
        resolver: zodResolver(jobApplicationSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            resume: undefined,
            coverLetter: ''

        }
    });

    const onSubmit = async (data: z.infer<typeof jobApplicationSchema>) => {
        try {
            setIsLoading(true)
            // await sendEmail('zero.business.hub@gmail.com', 'Job Application', 'job-application', data)
            // await sendEmail('zero.business.hub@gmail.com', 'Application Received', 'job-application-confirmation', data)
            toast.success('Application submitted successfully')
            setIsLoading(false)
        } catch {
            toast.error('Error sending resposne! Please try again.')
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
        console.log(data)
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium mb-1">Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" type="text" {...field} className="bg-zinc-800 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium mb-1">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@gmail.com" type="email" {...field} className="bg-zinc-800 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium mb-1">Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+91 7400******" type="phone" {...field} className="bg-zinc-800 border-zinc-700" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="resume"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium mb-1">Resume/CV</FormLabel>
                            <FormControl>
                                <div className="flex items-center justify-center w-full">
                                    {field.value ? (
                                        <div className="flex items-center justify-between w-full p-4 border-2 border-dashed rounded-lg bg-zinc-800 border-zinc-600">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-8 h-8 text-red-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-white">{field.value.name}</p>
                                                    <p className="text-xs text-zinc-400">{formatFileSize(field.value.size)}</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    field.onChange(undefined);
                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                                className="text-zinc-400 hover:text-white"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <Label
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-zinc-800 border-zinc-700 hover:bg-zinc-700/50"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-zinc-400" />
                                                <p className="mb-2 text-sm text-zinc-400">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-zinc-500">PDF (MAX. 5MB)</p>
                                            </div>
                                        </Label>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                field.onChange(file);
                                            }
                                        }}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="coverLetter"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium mb-1">Cover Letter (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Tell us why you're interested in this position..."
                                    className="bg-zinc-800 border-zinc-700 min-h-[120px]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <div className='flex items-center'>
                                Submitting...
                                <Loader className="ml-2 w-4 h-4 animate-spin" />
                            </div>
                        ) : (
                            <p>Submit Application</p>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}