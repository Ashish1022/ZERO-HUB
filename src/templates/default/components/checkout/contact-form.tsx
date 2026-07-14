"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { checkoutSchema } from "@/modules/checkout/schema"

type Props = {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>
}

export const ContactForm = ({ form }: Props) => {

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm font-bold text-amber-800">1</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">Contact Information</h2>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        name="firstname"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>First Name *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your first name" required />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="lastname"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>Last Name *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your last name" required />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="Enter your email" required />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel" placeholder="Enter your phone number" required />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    name="newsletter"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center space-x-2 pt-2">
                                <FormControl>
                                    <Checkbox id="newsletter" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel htmlFor="newsletter" className="text-sm text-stone-600">
                                    Subscribe to our newsletter for updates and exclusive offers
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}