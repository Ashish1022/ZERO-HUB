import type { Tenant } from "@/payload-types"
import { caller } from "@/trpc/server"
import { Button } from "@payloadcms/ui"
import "../index.scss"

export const dynamic = "force-dynamic"

export const SubscriptionUpgradeButton = async () => {
    const session = await caller.auth.session()
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <Button className="minimal-button secondary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "6px" }}>
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Manage Subscription
            </Button>
        )
    }
    return null
}
