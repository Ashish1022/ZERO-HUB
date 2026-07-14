import { Suspense } from "react";
import { redirect } from "next/navigation";

import { caller, getQueryClient, trpc } from "@/trpc/server";
import { Tenant } from "@/payload-types";
import { AlreadySubscribed, AlreadySubscribedLoading } from "@/modules/onboarding/ui/components/already-subscribed";
import { PricingLoading, SubscriptionView } from "@/modules/onboarding/ui/views/subscription-view";

export const dynamic = "force-dynamic"

const SubscriptionPage = async () => {

  const session = await caller.auth.session();
  const tenant = session.user?.tenants?.[0]?.tenant as Tenant;

  if (!session.user) redirect('/login')
  else {
    if (tenant.subscription?.subscriptionDetailsSubmitted) {
      const subscriptionId = tenant.subscription.subscriptionId

      const queryClient = getQueryClient();
      void queryClient.prefetchQuery(trpc.onboarding.getTenantSubscription.queryOptions({ subscriptionId: subscriptionId! }))

      return (
        <Suspense fallback={<AlreadySubscribedLoading />}>
          <AlreadySubscribed subscriptionId={subscriptionId!} />
        </Suspense>
      )
    }
  }

  return (
    <Suspense fallback={<PricingLoading />}>
      <SubscriptionView />
    </Suspense>
  )
}

export default SubscriptionPage