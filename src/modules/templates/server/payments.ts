import 'server-only'

import crypto from 'crypto'

import { razorpay } from '@/lib/razorpay'

export interface CreateOrderInput {
  amount: number
  currency: string
  receipt: string
  notes: Record<string, string>
}

export interface CreatedOrder {
  orderId: string
  amount: number
  currency: string
}

export interface VerifyPaymentInput {
  orderId: string
  paymentId: string
  signature: string
}

export interface TemplatePaymentProvider {
  readonly name: string
  createOrder(input: CreateOrderInput): Promise<CreatedOrder>
  verifyPayment(input: VerifyPaymentInput): boolean
}

class RazorpayPaymentProvider implements TemplatePaymentProvider {
  readonly name = 'razorpay'

  constructor(private readonly secret: string) {}

  async createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
    const order = await razorpay.orders.create({
      amount: input.amount,
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    })

    return {
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
    }
  }

  verifyPayment({ orderId, paymentId, signature }: VerifyPaymentInput): boolean {
    const expected = crypto
      .createHmac('sha256', this.secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const expectedBuffer = Buffer.from(expected, 'utf8')
    const providedBuffer = Buffer.from(signature, 'utf8')

    if (expectedBuffer.length !== providedBuffer.length) return false

    return crypto.timingSafeEqual(expectedBuffer, providedBuffer)
  }
}

export class MockPaymentProvider implements TemplatePaymentProvider {
  readonly name = 'mock'

  constructor(private readonly secret: string = 'mock-secret') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'MockPaymentProvider must never run in production — it would let any client forge a valid payment signature.',
      )
    }
  }

  async createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
    return {
      orderId: `order_mock_${crypto.randomBytes(8).toString('hex')}`,
      amount: input.amount,
      currency: input.currency,
    }
  }

  sign(orderId: string, paymentId: string): string {
    return crypto.createHmac('sha256', this.secret).update(`${orderId}|${paymentId}`).digest('hex')
  }

  verifyPayment({ orderId, paymentId, signature }: VerifyPaymentInput): boolean {
    const expected = this.sign(orderId, paymentId)
    const expectedBuffer = Buffer.from(expected, 'utf8')
    const providedBuffer = Buffer.from(signature, 'utf8')

    if (expectedBuffer.length !== providedBuffer.length) return false
    return crypto.timingSafeEqual(expectedBuffer, providedBuffer)
  }
}

let provider: TemplatePaymentProvider | undefined

export const getPaymentProvider = (): TemplatePaymentProvider => {
  if (provider) return provider

  if (process.env.TEMPLATE_PAYMENTS_MOCK === 'true') {
    provider = new MockPaymentProvider(process.env.TEMPLATE_PAYMENTS_MOCK_SECRET)
    return provider
  }

  const secret = process.env.RAZOR_PAY_SECRET_KEY
  if (!secret) {
    throw new Error(
      'RAZOR_PAY_SECRET_KEY is not set. Template purchases cannot verify payment signatures without it. ' +
        'Set TEMPLATE_PAYMENTS_MOCK=true for local development.',
    )
  }

  provider = new RazorpayPaymentProvider(secret)
  return provider
}

export const __resetPaymentProvider = () => {
  provider = undefined
}
