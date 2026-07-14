import type React from "react"
import { Banner } from "@payloadcms/ui/elements/Banner"
import type { Tenant } from "@/payload-types"
import { caller } from "@/trpc/server"
import { SubscriptionUpgradeButton } from "./subscription-upgrade"
import { SubscriptionVerifyButton } from "./subscription-purchase"
import { TenantBankVerifyButton } from "./tenant-verify"
import "./index.scss"
import Link from "next/link"

const baseClass = "before-dashboard"

const calculateTrialTimeRemaining = (createdAt: string) => {
  const trialPeriodDays = 14
  const createdDate = new Date(createdAt)
  const currentDate = new Date()
  const trialEndDate = new Date(createdDate.getTime() + trialPeriodDays * 24 * 60 * 60 * 1000)
  const timeRemaining = trialEndDate.getTime() - currentDate.getTime()

  if (timeRemaining <= 0) {
    return { expired: true, display: "Trial Expired", urgent: true }
  }

  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

  if (daysRemaining > 1) {
    return {
      expired: false,
      display: `${daysRemaining} days remaining`,
      urgent: daysRemaining <= 3,
    }
  } else if (daysRemaining === 1) {
    return {
      expired: false,
      display: `1 day, ${hoursRemaining} hours remaining`,
      urgent: true,
    }
  } else if (hoursRemaining > 0) {
    return {
      expired: false,
      display: `${hoursRemaining}h ${minutesRemaining}m remaining`,
      urgent: true,
    }
  } else {
    return {
      expired: false,
      display: `${minutesRemaining} minutes remaining`,
      urgent: true,
    }
  }
}

const BeforeDashboard: React.FC = async () => {
  const session = await caller.auth.session()
  const tenant = session.user?.tenants?.[0].tenant as Tenant

  if (!tenant) {
    return (
      <div className={baseClass}>
        <Banner className={`${baseClass}__banner`} type="error">
          <h4>Unable to load account information</h4>
          <p>Please refresh the page or contact support if the issue persists.</p>
        </Banner>
      </div>
    )
  }

  const trialInfo = calculateTrialTimeRemaining(tenant.createdAt)
  const hasActiveSubscription = tenant.subscription?.subscriptionDetailsSubmitted
  const hasBankDetails = tenant.bankDetails?.bankDetailsSubmitted
  const completedSteps = [hasActiveSubscription, hasBankDetails].filter(Boolean).length

  return (
    <div className={baseClass}>
      {/* Professional Trial Banner */}
      <div
        className={`${baseClass}__trial-banner ${trialInfo.urgent ? "urgent" : ""} ${trialInfo.expired ? "expired" : ""}`}
      >
        <div className={`${baseClass}__trial-container`}>
          <div className={`${baseClass}__trial-left`}>
            <div className={`${baseClass}__trial-status`}>
              <span className={`${baseClass}__trial-badge`}>{trialInfo.expired ? "TRIAL EXPIRED" : "FREE TRIAL"}</span>
              <h2 className={`${baseClass}__trial-title`}>
                {trialInfo.expired ? "Your trial has ended" : "Your free trial is active"}
              </h2>
            </div>
          </div>
          <div className={`${baseClass}__trial-right`}>
            <div className={`${baseClass}__trial-timer`}>
              <div className={`${baseClass}__timer-display`}>
                {!trialInfo.expired && (
                  <>
                    {(() => {
                      const trialEndDate = new Date(new Date(tenant.createdAt).getTime() + 14 * 24 * 60 * 60 * 1000)
                      const now = new Date()
                      const timeLeft = trialEndDate.getTime() - now.getTime()

                      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
                      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

                      if (days > 0) {
                        return (
                          <>
                            <div className={`${baseClass}__timer-unit`}>
                              <span className={`${baseClass}__timer-number`}>{days}</span>
                              <span className={`${baseClass}__timer-label`}>Days</span>
                            </div>
                            <div className={`${baseClass}__timer-separator`}>:</div>
                            <div className={`${baseClass}__timer-unit`}>
                              <span className={`${baseClass}__timer-number`}>{hours.toString().padStart(2, "0")}</span>
                              <span className={`${baseClass}__timer-label`}>Hours</span>
                            </div>
                          </>
                        )
                      } else if (hours > 0) {
                        return (
                          <>
                            <div className={`${baseClass}__timer-unit`}>
                              <span className={`${baseClass}__timer-number`}>{hours}</span>
                              <span className={`${baseClass}__timer-label`}>Hours</span>
                            </div>
                            <div className={`${baseClass}__timer-separator`}>:</div>
                            <div className={`${baseClass}__timer-unit`}>
                              <span className={`${baseClass}__timer-number`}>
                                {minutes.toString().padStart(2, "0")}
                              </span>
                              <span className={`${baseClass}__timer-label`}>Minutes</span>
                            </div>
                          </>
                        )
                      } else {
                        return (
                          <div className={`${baseClass}__timer-unit`}>
                            <span className={`${baseClass}__timer-number`}>{minutes}</span>
                            <span className={`${baseClass}__timer-label`}>Minutes Left</span>
                          </div>
                        )
                      }
                    })()}
                  </>
                )}
                {trialInfo.expired && (
                  <div className={`${baseClass}__timer-expired`}>
                    <span className={`${baseClass}__expired-text`}>Trial Ended</span>
                    <span className={`${baseClass}__expired-date`}>
                      {new Date(new Date(tenant.createdAt).getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <div className={`${baseClass}__trial-action`}>
                {!trialInfo.expired ? (
                  <span className={`${baseClass}__trial-message`}>
                    {trialInfo.urgent ? "Upgrade now to avoid interruption" : "Upgrade anytime to unlock all features"}
                  </span>
                ) : (
                  <span className={`${baseClass}__trial-message expired`}>
                    Subscribe now to restore access to your account
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`${baseClass}__main`}>
        {/* Header Section */}
        <div className={`${baseClass}__header`}>
          <div className={`${baseClass}__header-content`}>
            <h1 className={`${baseClass}__title`}>Account Setup</h1>
            <p className={`${baseClass}__subtitle`}>Complete these essential steps to start selling your products</p>
          </div>
          <div className={`${baseClass}__progress`}>
            <div className={`${baseClass}__progress-text`}>
              <span className={`${baseClass}__progress-label`}>Progress</span>
              <span className={`${baseClass}__progress-count`}>{completedSteps}/2 Complete</span>
            </div>
            <div className={`${baseClass}__progress-bar`}>
              <div className={`${baseClass}__progress-fill`} style={{ width: `${(completedSteps / 2) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Steps Grid */}
        <div className={`${baseClass}__steps-grid`}>
          <div className={`${baseClass}__step-card ${hasActiveSubscription ? "completed" : "active"}`}>
            <div className={`${baseClass}__step-header`}>
              <div className={`${baseClass}__step-number`}>{hasActiveSubscription ? "✓" : "1"}</div>
              <div className={`${baseClass}__step-status`}>{hasActiveSubscription ? "Completed" : "Required"}</div>
            </div>
            <div className={`${baseClass}__step-content`}>
              <h3 className={`${baseClass}__step-title`}>Subscription Plan</h3>
              <p className={`${baseClass}__step-description`}>
                Activate your subscription to unlock all platform features and maintain account access
              </p>
              <div className={`${baseClass}__step-action`}>
                <SubscriptionVerifyButton />
              </div>
            </div>
          </div>

          <div
            className={`${baseClass}__step-card ${hasBankDetails ? "completed" : hasActiveSubscription ? "active" : "disabled"}`}
          >
            <div className={`${baseClass}__step-header`}>
              <div className={`${baseClass}__step-number`}>{hasBankDetails ? "✓" : "2"}</div>
              <div className={`${baseClass}__step-status`}>
                {hasBankDetails ? "Completed" : hasActiveSubscription ? "Available" : "Locked"}
              </div>
            </div>
            <div className={`${baseClass}__step-content`}>
              <h3 className={`${baseClass}__step-title`}>Payment Setup</h3>
              <p className={`${baseClass}__step-description`}>
                Connect your bank account to receive payments from product sales directly
              </p>
              <div className={`${baseClass}__step-action`}>
                <TenantBankVerifyButton />
              </div>
            </div>
          </div>

          <div className={`${baseClass}__step-card ${hasActiveSubscription && hasBankDetails ? "active" : "disabled"}`}>
            <div className={`${baseClass}__step-header`}>
              <div className={`${baseClass}__step-number`}>3</div>
              <div className={`${baseClass}__step-status`}>
                {hasActiveSubscription && hasBankDetails ? "Ready" : "Locked"}
              </div>
            </div>
            <div className={`${baseClass}__step-content`}>
              <h3 className={`${baseClass}__step-title`}>Product Catalog</h3>
              <p className={`${baseClass}__step-description`}>
                Add your first products to the catalog and start generating sales
              </p>
              <div className={`${baseClass}__step-action`}>
                {hasActiveSubscription && hasBankDetails ? (
                  <Link href="/admin/collections/products" className={`${baseClass}__step-link`}>
                    Manage Products →
                  </Link>
                ) : (
                  <span className={`${baseClass}__step-disabled`}>Complete previous steps to unlock</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Management Section */}
        {hasActiveSubscription && (
          <div className={`${baseClass}__manage-section`}>
            <div className={`${baseClass}__manage-content`}>
              <h3 className={`${baseClass}__manage-title`}>Subscription Management</h3>
              <p className={`${baseClass}__manage-description`}>
                Upgrade your plan, modify billing settings, or view detailed usage analytics
              </p>
            </div>
            <div className={`${baseClass}__manage-action`}>
              <SubscriptionUpgradeButton />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BeforeDashboard
