import { getPayload } from "payload";
import { Payload } from "./route";

import config from "@payload-config";
import { Subscription, Tenant } from "@/payload-types";

const payload = await getPayload({ config });

export async function handleSubscriptionActivated(subscription: Payload) {
    try {
        const payloadSubscription = await payload.find({
            collection: "subscriptions",
            limit: 1,
            depth: 1,
            where: {
                razorpaySubscriptionId: {
                    equals: subscription.payload.subscription.entity.id,
                },
            },
        })
        if (payloadSubscription.docs.length === 0) {
            return;
        }

        const sub: Subscription = payloadSubscription.docs[0];
        const tenantId = (sub.tenant as Tenant).id

        await payload.update({
            collection: 'subscriptions',
            id: sub.id,
            data: {
                status: 'active',
                startAt: new Date(subscription.payload.subscription.entity.start_at * 1000).toISOString(),
                endAt: subscription.payload.subscription.entity.end_at ? new Date(subscription.payload.subscription.entity.end_at * 1000).toISOString() : undefined,
                currentStart: new Date(subscription.payload.subscription.entity.current_start * 1000).toISOString(),
                currentEnd: new Date(subscription.payload.subscription.entity.current_end * 1000).toISOString(),
                chargeAt: new Date(subscription.payload.subscription.entity.charge_at * 1000).toISOString(),
                paidCount: subscription.payload.subscription.entity.paid_count,
                remainingCount: subscription.payload.subscription.entity.remaining_count,
            }
        })

        await payload.update({
            collection: 'tenants',
            id: tenantId,
            data: {
                subscription: {
                    subscriptionId: subscription.payload.subscription.entity.id,
                    subscriptionStatus: 'active',
                    subscriptionStartDate: new Date(subscription.payload.subscription.entity.start_at * 1000).toISOString(),
                    subscriptionEndDate: new Date(subscription.payload.subscription.entity.end_at * 1000).toISOString(),
                    subscriptionDetailsSubmitted: true,
                },
            },
        });
        console.log('Subscription activated successfully:', subscription.payload.subscription.entity.id);
    } catch (error) {
        console.error('Error handling subscription activation:', error);
    }
}