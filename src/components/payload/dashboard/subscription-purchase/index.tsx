import type { Tenant } from "@/payload-types"
import { caller } from "@/trpc/server"
import { Button, Link } from "@payloadcms/ui"
import "../index.scss"

export const dynamic = "force-dynamic"

export const SubscriptionVerifyButton = async () => {
    const session = await caller.auth.session()
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <Button disabled className="minimal-button complete">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "6px" }}>
                    <path
                        d="M13.5 4.5L6 12L2.5 8.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Subscription Active
            </Button>
        )
    }

    return (
        <Link href="/subscription">
            <Button className="minimal-button primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "6px" }}>
                    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Purchase Plan
            </Button>
        </Link>
    )
}
