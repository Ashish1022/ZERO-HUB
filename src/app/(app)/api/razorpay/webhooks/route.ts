import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { handleSubscriptionActivated } from './_utils';

const secret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

export type Payload = {
    event: string;
    payload: {
        subscription: {
            entity: {
                id: string
                customer_id: string
                status: string
                start_at: number
                end_at: number
                current_start: number
                current_end: number
                charge_at: number
                remaining_count: number
                paid_count: number
                notes: {
                    tenantId: string
                    planId: string
                }
            }
        };
        payment: {
            entity: {
                email: string;
                amount: number;
                contact: string;
                order_id: string;
                id: string;
                description: string;
                notes: {
                    orderId: string;
                }
            };
        };
    };
};

export async function POST(req: NextRequest) {
    try {
        const signature = req.headers.get('x-razorpay-signature') as string;
        const body = await req.json();
        const payload: Payload = body;

        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(payload))
            .digest('hex');

        if (signature !== expectedSignature) {
            return new NextResponse("Signature invalid", { status: 401 });
        }
        switch (payload.event) {
            case 'subscription.activated':
                await handleSubscriptionActivated(payload);
                break;
            case 'account.rejected':
                return NextResponse.json({ status: 400, message: "Something went wrong" });
            default:
                console.log('Unhandled webhook event:', payload.event);
        }
        return NextResponse.json({ recieved: true, status: 200 })
    } catch {
        return new NextResponse('Webhook error', { status: 500 })
    }
}