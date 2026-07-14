import React from 'react'
import { redirect } from 'next/navigation';

import { SignInView } from '@/modules/auth/ui/views/sign-in-view'
import { caller } from '@/trpc/server';

export const dynamic = "force-dynamic"

const page = async () => {

  const session = await caller.auth.session();
  if (session.user) redirect('/');

  return <SignInView />
}

export default page