import { createTRPCRouter } from "../init";

import { authRouter } from "@/modules/auth/server/procedure";
import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { reviewsRouter } from "@/modules/reviews/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";
import { checkoutRouter } from "@/modules/checkout/server/procedure";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { onboardingRouter } from "@/modules/onboarding/server/procedure";
import { analyticsRouter } from "@/modules/analytics/server/procedure";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tenants: tenantsRouter,
    reviews: reviewsRouter,
    products: productsRouter,
    analytics: analyticsRouter,
    checkout: checkoutRouter,
    categories: categoriesRouter,
    onboarding: onboardingRouter
})

export type AppRouter = typeof appRouter;