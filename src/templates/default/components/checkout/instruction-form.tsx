import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { checkoutSchema } from "@/modules/checkout/schema"

interface Props {
    form: UseFormReturn<z.infer<typeof checkoutSchema>>
}

export const InstructionForm = ({ form }: Props) => {

    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    <span className="text-sm font-bold text-amber-800">4</span>
                </div>
                <h2 className="text-xl font-bold text-stone-900">Special Instructions</h2>
            </div>
            <div className="space-y-4">
                <FormField
                    name="instruction"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="space-y-2">
                                <FormLabel>Delivery Instructions (optional)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Any special delivery instructions, gate codes, or preferred delivery location..."
                                        className="min-h-[100px] w-full rounded-md border border-stone-300 px-3 py-2 text-sm placeholder:text-stone-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    name="safePlace"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox id="safe-place" checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-sm text-stone-600">Leave in a safe place if I&apos;m not home</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}