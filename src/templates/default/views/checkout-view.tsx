"use client"

import { ArrowLeft, Calendar, CheckCircle, Clock, MapPin, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ContactForm } from "../components/checkout/contact-form"
import { ShippingForm } from "../components/checkout/shipping-form"
import { DeliveryForm } from "../components/checkout/delivery-form"
import { InstructionForm } from "../components/checkout/instruction-form"

import { formatPrice, generateTenantUrl } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form
} from "@/components/ui/form"
import { useMutation, useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useCart } from "@/modules/products/hooks/use-cart"
import { checkoutSchema } from "@/modules/checkout/schema"
import toast from "react-hot-toast"
import { loadRazorpayScript } from "@/modules/checkout/actions/get-razorpay-script"

export const CheckoutView = ({ slug }: { slug: string }) => {

    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            newsletter: false,
            street: '',
            apartment: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            billingSame: true,
            deliveryOption: "standard",
            instruction: '',
            safePlace: false,
            finalAmount: 0,
            products: [],
            tenant: '',
            grossAmount: 0,
            discountAmount: 0,
            taxAmount: 0,
            shippingAmount: 0,
            saleAmount: 0,
        }
    });

    const { cartItems, getProductQuantity, totalItems } = useCart(slug);
    const productIds = cartItems.map((item) => item.productId)

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.checkout.getMany.queryOptions({ productIds: productIds }));

    const grossAmount = data?.docs.reduce((acc, product) => {
        const quantity = getProductQuantity(product.id);
        const unitPrice = product.pricing.price;
        return acc + unitPrice * quantity;
    }, 0);

    const saleAmount = data?.docs.reduce((acc, product) => {
        const quantity = getProductQuantity(product.id);
        const unitPrice = product.pricing.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price;
        return acc + unitPrice * quantity
    }, 0);

    const discountedAmount = grossAmount - saleAmount;

    const shippingAmount = form.watch('deliveryOption') === 'express' ? 25 : 15;

    const taxAmount = saleAmount * 0.18

    const finalAmount = saleAmount + taxAmount + shippingAmount;

    const verifyOrderMutation = useMutation(trpc.checkout.verifyOrder.mutationOptions({
        onSuccess: () => { toast.success('Payment completed.') },
        onError: () => {
            toast.error('Pyament failed.')
        }
    }))

    const createOrderMutation = useMutation(trpc.checkout.createOrder.mutationOptions({
        onSuccess: async (createOrderData) => {

            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                alert('Razorpay SDK failed to load. Please check your internet connection.');
                return;
            };

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: createOrderData?.amount,
                currency: 'INR',
                name: 'ZERO | HUB',
                image: '/logo/logo.svg',
                order_id: createOrderData?.razorpay_order_id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler: async function (response: any) {
                    const products = cartItems.map(item => ({
                        productId: item.productId,
                        name: data?.docs.find(product => product.id === item.productId)?.name || '',
                        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                        category: data?.docs.find(product => product.id === item.productId)?.category.name!,
                        quantity: item.quantity,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                        price: data?.docs.find(product => product.id === item.productId)?.pricing.price!,
                        compareAtPrice: data?.docs.find(product => product.id === item.productId)?.pricing?.compareAtPrice || 0,
                    }));
                    verifyOrderMutation.mutate({
                        slug: slug,
                        amount: createOrderData.amount,
                        uniqueId: createOrderData.uniqueId,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        grossAmount: grossAmount,
                        saleAmount: saleAmount,
                        discountAmount: 0,
                        products: products,
                    })
                },
                prefill: {
                    name: createOrderData?.customerName,
                    email: createOrderData?.customerEmail,
                    contact: createOrderData?.customerPhone
                },
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            razorpay.on('payment.failed', function (_response: Response) {
                toast.error("Payment failed. Please try again.");
            });

        },
        onError: () => {
            toast.error("Something went wrong")
        }
    }))

    const onSubmit = (values: z.infer<typeof checkoutSchema>) => {
        const products = cartItems.map(item => ({
            productId: item.productId,
            name: data?.docs.find(product => product.id === item.productId)?.name || '',
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            category: data?.docs.find(product => product.id === item.productId)?.category.name!,
            quantity: item.quantity,
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            price: data?.docs.find(product => product.id === item.productId)?.pricing.price!,
            compareAtPrice: data?.docs.find(product => product.id === item.productId)?.pricing?.compareAtPrice || 0,
        }));
        createOrderMutation.mutate({
            ...values,
            finalAmount: finalAmount,
            discountAmount: 0,
            grossAmount: grossAmount,
            taxAmount: taxAmount,
            shippingAmount: shippingAmount,
            saleAmount: saleAmount,
            products: products,
            tenant: slug
        })
    }

    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <Link href={`${generateTenantUrl(slug)}/cart`} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
            </Link>
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Checkout</h1>
                <p className="text-gray-500">Complete your order information</p>
            </div>
            {totalItems > 0 ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="space-y-8">
                                    <ContactForm form={form} />
                                    <ShippingForm form={form} />
                                    <DeliveryForm form={form} />
                                    <InstructionForm form={form} />
                                </div>
                            </div>
                            <div>
                                <div className="sticky top-6 space-y-6">
                                    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                                        <h2 className="mb-4 text-lg font-bold text-stone-900">Order Summary</h2>
                                        <div className="space-y-4">
                                            {data?.docs.map((product) => (
                                                <div key={product.id} className="flex gap-4">
                                                    <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-50">
                                                        <Image src={product.image?.url || "/placeholder.png"} alt={product.name} fill className="object-cover" />
                                                        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                                                            {getProductQuantity(product.id)}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium">{product.name}</h3>
                                                        <p className="text-sm text-gray-500">{formatPrice(product.pricing.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price)} each</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">{formatPrice(product.pricing?.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price * getProductQuantity(product.id))}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <Separator />
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subtotal</span>
                                                    <span>{formatPrice(grossAmount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Discount Amount</span>
                                                    <span>{formatPrice(discountedAmount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Sale Price</span>
                                                    <span>{formatPrice(saleAmount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Shipping</span>
                                                    <span>{formatPrice(shippingAmount)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tax</span>
                                                    <span>{formatPrice(taxAmount)}</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between font-bold text-lg">
                                                    <span>Total</span>
                                                    <span>{formatPrice(finalAmount)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-stone-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                                        <h3 className="mb-4 flex items-center gap-2 font-bold text-stone-900">
                                            <Calendar className="h-5 w-5 text-amber-600" />
                                            Delivery Information
                                        </h3>

                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-4 w-4 text-stone-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-stone-900">Delivery Area</p>
                                                    <p className="text-stone-600">Free delivery on orders over $500</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Clock className="h-4 w-4 text-stone-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-stone-900">Delivery Window</p>
                                                    <p className="text-stone-600">9:00 AM - 6:00 PM, Monday to Friday</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Shield className="h-4 w-4 text-stone-600 mt-0.5" />
                                                <div>
                                                    <p className="font-medium text-stone-900">Secure Packaging</p>
                                                    <p className="text-stone-600">All items carefully packaged and insured</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                                        <div className="flex items-center gap-2 text-green-800">
                                            <CheckCircle className="h-5 w-5" />
                                            <span className="text-sm font-medium">Secure Checkout</span>
                                        </div>
                                        <p className="mt-1 text-xs text-green-700">
                                            Your information is encrypted and secure. Payment will be processed on the next step.
                                        </p>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                                        size="lg"
                                        disabled={createOrderMutation.isPending}
                                    >
                                        {createOrderMutation.isPending ? 'Processing...' : 'Continue to Payment'}
                                    </Button>
                                    <p className="text-center text-xs text-gray-500">
                                        By continuing, you agree to our{" "}
                                        <Link href="/terms" className="underline hover:text-amber-600">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="underline hover:text-amber-600">
                                            Privacy Policy
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </Form>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
                    <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
                    <p className="mb-6 text-gray-500">Looks like you haven&apos;t added any products to your cart yet.</p>
                    <Button asChild className="bg-stone-900 hover:bg-amber-600 text-white rounded-full p-6 text-md font-semibold transition-all duration-300 transform hover:scale-105"
                        size="sm">
                        <Link href={`${generateTenantUrl(slug)}/products`}>Start Shopping</Link>
                    </Button>
                </div >
            )}
        </div >
    )
}