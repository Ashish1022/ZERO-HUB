import { headers as getHeaders } from 'next/headers';
import { loginSchema, registerSchema, verifySchema } from '../schema';
import { generateAuthCookie } from '../lib/cookie';
import { checkOtpRestrictions, sendOtp, trackOtpRequests, verifyOtp } from '../lib/utils';

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from '@trpc/server';

export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();

        const session = await ctx.db.auth({ headers });
        return session;
    }),
    login: baseProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "users",
                where: {
                    email: {
                        equals: input.email
                    }
                }
            })
            if (data.totalDocs === 0) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Email does not exists!."
                })
            }
            const user = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                }
            });
            if (!user.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login!"
                })
            };
            await generateAuthCookie({
                prefix: `${ctx.db.config.cookiePrefix}-token`,
                value: user.token,
            });
            return user
        }),
    register: baseProcedure
        .input(registerSchema)
        .mutation(async ({ ctx, input }) => {
            const existingUser = await ctx.db.find({
                collection: "users",
                limit: 1,
                where: {
                    or: [
                        { username: { equals: input.username } },
                        { email: { equals: input.email } },
                        { phone: { equals: input.phone } }
                    ]
                }
            });
            if (existingUser.totalDocs > 0) {
                const match = existingUser.docs[0];
                if (match.username === input.username) throw new TRPCError({ code: "BAD_REQUEST", message: "Username already taken" });
                if (match.email === input.email) throw new TRPCError({ code: "BAD_REQUEST", message: "Email is already registered." });
                if (match.phone === input.phone) throw new TRPCError({ code: "BAD_REQUEST", message: "Phone number already in use" });
            }

            try {
                await checkOtpRestrictions(input.email);
                await trackOtpRequests(input.email);
                await sendOtp(input.username, input.email, "seller-activation");
            } catch (error) {
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: error instanceof Error ? error.message : "Failed to send OTP"
                });
            }

            return { message: "OPT sent to email. Please verify your account." }
        }),
    verify: baseProcedure
        .input(verifySchema)
        .mutation(async ({ ctx, input }) => {
            try {
                await verifyOtp(input.email, input.otp);
            } catch (error) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: error instanceof Error ? error.message : "Invalid OTP or OTP expired"
                });
            }
            const tenant = await ctx.db.create({
                collection: "tenants",
                data: {
                    name: input.username,
                    slug: input.username,
                    phone: input.phone,
                    store: input.store,
                    activeTemplate: 'default',
                    subscription: {
                        isTrialActive: true
                    }
                }
            })
            await ctx.db.create({
                collection: "users",
                data: {
                    email: input.email,
                    roles: ['user'],
                    username: input.username,
                    password: input.password,
                    phone: input.phone,
                    tenants: [
                        {
                            tenant: tenant.id
                        }
                    ]
                }
            });
            const data = await ctx.db.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password
                },
            });
            if (!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login!"
                })
            }
            await generateAuthCookie({
                value: data.token,
                prefix: ctx.db.config.cookiePrefix
            });
            return data;
        })
})