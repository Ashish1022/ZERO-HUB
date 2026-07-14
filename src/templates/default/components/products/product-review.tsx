import { useState } from "react";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StarPicker } from "../star-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Review } from "@/payload-types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { reviewSchema } from "@/modules/reviews/schema";

interface Props {
    reviewCount: number;
    reviewRating: number;
    ratingDistribution: Record<number, number>;
    reviews: Review[];
    product: string;
    slug: string
}

const MAX_RATING = 5;
const MIN_RATING = 0;

export const ProductReview = ({ reviewCount, reviewRating, ratingDistribution, reviews, product, slug }: Props) => {

    const [showReviewForm, setShowReviewForm] = useState(false)

    const safeRating = Math.max(MIN_RATING, Math.min(reviewRating, MAX_RATING));

    const form = useForm<z.infer<typeof reviewSchema>>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            name: '',
            email: '',
            title: '',
            description: '',
            rating: 0,
            product: product,
            tenant: slug
        }
    });

    const trpc = useTRPC();

    const reviewMutation = useMutation(trpc.reviews.create.mutationOptions({
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            toast.success('Review submitted')
            setShowReviewForm(false)
        }
    }))

    const onSubmit = (data: z.infer<typeof reviewSchema>) => {
        const sanitized = {
            ...data,
            product: product,
            tenant: slug,
            email: data.email?.trim().toLowerCase() || undefined,
        };
        reviewMutation.mutate(sanitized);
    }
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold">{reviewRating}</span>
                        <div className="flex">
                            {Array.from({ length: MAX_RATING }).map((_, index) => (
                                <StarIcon
                                    key={index}
                                    className={cn("size-4", index < safeRating ? "fill-black" : "", 'size-4')}
                                />
                            ))}
                        </div>
                        <span className="text-gray-600">({reviewCount} reviews)</span>
                    </div>
                </div>
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                        return (
                            <div key={stars} className="flex items-center gap-2 text-sm">
                                <span className="w-8">{stars}</span>
                                <StarIcon className="h-3 w-3 fill-gray-900 text-gray-900" />
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div className="bg-gray-900 h-2 rounded-full" style={{ width: `${ratingDistribution[stars]}%` }} />
                                </div>
                                <span className="w-8 text-gray-600">{ratingDistribution[stars]}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? "Cancel" : "Write a Review"}
                </Button>
            </div>
            {showReviewForm && (
                <div className="rounded-lg border p-6">
                    <h4 className="mb-4 text-lg font-medium">Write a Review</h4>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    name="rating"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rating</FormLabel>
                                            <FormControl>
                                                <StarPicker
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Review Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Give your review a title" type="text" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Review Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Share your thoughts about this product" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <FormField
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter your name" type="text" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your email (optional)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Enter your email" type="email" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Submit Review
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{review.name}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-gray-900 text-gray-900" : "text-gray-300"}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                        <h4 className="mt-2 font-medium">{review.title}</h4>
                        <p className="mt-1 text-gray-600">{review.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}