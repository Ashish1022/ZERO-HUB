import { useForm } from "react-hook-form"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { contactFormSchema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle, Send } from "lucide-react"
import { useState } from "react"

export const ContactForm = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            message: '',
            subject: ''
        }
    });

    const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
        setIsSubmitting(true)
        // TODO: Handle submit funcitonality
        console.log(data)
        setIsSubmitting(false)
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen  relative flex items-center justify-center">
                <div className="container relative z-10 px-4 mx-auto">
                    <div
                        className="max-w-md mx-auto text-center"
                    >
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
                        <p className="text-zinc-400 mb-8">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                            Send Another Message
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-sm font-medium text-zinc-300 mb-2">Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your full name" {...field} type="text" className="bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500" />
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
                                <FormLabel className="block text-sm font-medium text-zinc-300 mb-2">Email *</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@gmail.com" {...field} type="email" className="bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-zinc-300 mb-2">Company *</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Company name" {...field} type="text" className="bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="company"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-zinc-300 mb-2">Company *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-zinc-900/80 border-zinc-700 text-white">
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-zinc-900 border-zinc-700 w-full">
                                    <SelectItem value="technical">Technical Support</SelectItem>
                                    <SelectItem value="sales">Sales Inquiry</SelectItem>
                                    <SelectItem value="billing">Billing Question</SelectItem>
                                    <SelectItem value="feature">Feature Request</SelectItem>
                                    <SelectItem value="partnership">Partnership</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-sm font-medium text-zinc-300 mb-2">Message *</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tell us how we can help you..." {...field} className="bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[120px]" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-3"
                >
                    {isSubmitting ? (
                        <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Sending...
                        </div>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}