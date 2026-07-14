"use client"

import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useEffect, useMemo } from "react"
import { COUNTRIES_WITH_STATES, getStatesByCountry, hasStates } from "@/constants/countries"
import { checkoutSchema } from "@/modules/checkout/schema"

type Props = {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>
}

export const ShippingForm = ({ form }: Props) => {

    const selectedCountry = form.watch('country')

    const availableStates = useMemo(() => {
        return selectedCountry ? getStatesByCountry(selectedCountry) : []
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry) {
            form.setValue('state', '')
        }
    }, [selectedCountry, form])

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm font-bold text-amber-800">2</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">Shipping Address</h2>
            </div>
            <div className="space-y-4">
                <FormField
                    name="street"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormLabel>Street Address *</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your street address" required />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    name="apartment"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormLabel>Apartment, suite, etc. *</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter apartment or suite number" required />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>City *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter city" required />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="zip"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>ZIP/Postal Code *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter ZIP code" required />
                                    </FormControl>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                        name="state"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>State/Province *</FormLabel>
                                    {hasStates(selectedCountry) ? (
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            disabled={!selectedCountry}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a state/province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {availableStates.map((state) => (
                                                    <SelectItem key={state.code} value={state.code}>
                                                        {state.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter state/province"
                                                disabled={!selectedCountry}
                                            />
                                        </FormControl>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="country"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <div className="space-y-2">
                                    <FormLabel>Country *</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {COUNTRIES_WITH_STATES.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    name="billingSame"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center space-x-2 pt-2">
                                <FormControl>
                                    <Checkbox id="billingSame" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel htmlFor="billingSame" className="text-sm text-stone-600">
                                    Billing address is the same as shipping address
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}