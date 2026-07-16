"use client"

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { loadRazorpayScript } from '@/modules/checkout/actions/get-razorpay-script'

interface RazorpayHandlerResponse {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id: string
  handler: (response: RazorpayHandlerResponse) => void
  modal?: { ondismiss?: () => void }
  theme?: { color?: string }
}

interface RazorpayInstance {
  open: () => void
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

export const useTemplateActions = () => {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [pendingSlug, setPendingSlug] = useState<string | null>(null)

  const invalidate = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: trpc.templates.list.queryKey() }),
      queryClient.invalidateQueries({ queryKey: trpc.templates.listOwned.queryKey() }),
    ])
    router.refresh()
  }, [queryClient, router, trpc])

  const claim = useMutation(
    trpc.templates.claim.mutationOptions({
      onSuccess: async () => {
        toast.success('Template added to your library.')
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    }),
  )

  const activate = useMutation(
    trpc.templates.activate.mutationOptions({
      onSuccess: async () => {
        toast.success('Template activated. Your storefront is live with it now.')
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    }),
  )

  const deactivate = useMutation(
    trpc.templates.deactivate.mutationOptions({
      onSuccess: async () => {
        toast.success('Reverted to the default template.')
        await invalidate()
      },
      onError: (error) => toast.error(error.message),
    }),
  )

  const createOrder = useMutation(trpc.templates.createOrder.mutationOptions())
  const completePurchase = useMutation(trpc.templates.completePurchase.mutationOptions())

  const purchase = useCallback(
    async (slug: string) => {
      setPendingSlug(slug)

      try {
        const scriptLoaded = await loadRazorpayScript()
        if (!scriptLoaded) {
          toast.error('Could not reach the payment provider. Check your connection and retry.')
          return
        }

        const order = await createOrder.mutateAsync({ slug })

        const razorpay = new window.Razorpay({
          key: order.keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'ZERO | HUB',
          description: order.templateName,
          image: '/logo/logo.svg',
          order_id: order.orderId,
          theme: { color: '#2563eb' },
          handler: async (response) => {
            try {
              await completePurchase.mutateAsync({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              })
              toast.success(`${order.templateName} is yours. Activate it whenever you're ready.`)
              await invalidate()
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : 'Payment went through but we could not confirm it. Contact support if it does not appear shortly.',
              )
            } finally {
              setPendingSlug(null)
            }
          },
          modal: {
            ondismiss: () => setPendingSlug(null),
          },
        })

        razorpay.open()
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Could not start the purchase.')
        setPendingSlug(null)
      }
    },
    [completePurchase, createOrder, invalidate],
  )

  const isBusy = (slug: string) =>
    pendingSlug === slug ||
    (claim.isPending && claim.variables?.slug === slug) ||
    (activate.isPending && activate.variables?.slug === slug)

  return {
    claim: (slug: string) => claim.mutate({ slug }),
    activate: (slug: string) => activate.mutate({ slug }),
    deactivate: () => deactivate.mutate(),
    purchase,
    isBusy,
    isDeactivating: deactivate.isPending,
  }
}
