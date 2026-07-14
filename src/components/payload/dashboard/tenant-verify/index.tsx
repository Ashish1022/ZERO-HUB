import type { Tenant } from "@/payload-types"
import { caller } from "@/trpc/server"
import { Button, Link } from "@payloadcms/ui"
import "../index.scss"

export const dynamic = "force-dynamic"

export const TenantBankVerifyButton = async () => {
    const session = await caller.auth.session()
    const tenant = session.user?.tenants?.[0].tenant as Tenant

    if (tenant.bankDetails?.bankDetailsSubmitted) {
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
                Bank Verified
            </Button>
        )
    }

    if (!tenant.subscription?.subscriptionDetailsSubmitted) {
        return (
            <Button disabled className="minimal-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "6px" }}>
                    <path
                        d="M8 8V12M8 4H8.01M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                </svg>
                Requires Subscription
            </Button>
        )
    }

    return (
        <Link href="/verify-bank">
            <Button className="minimal-button primary">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "6px" }}>
                    <path
                        d="M2 4H14V12C14 12.5523 13.5523 13 13 13H3C2.44772 13 2 12.5523 2 12V4ZM2 4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4M5 7H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
                Verify Bank Details
            </Button>
        </Link>
    )
}
