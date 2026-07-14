import { payload } from '@/lib/payload'
import { subscriptionPlans } from './plans'

const seed = async () => {
  const adminTenant = await payload.create({
    collection: 'tenants',
    data: {
      name: 'admin',
      slug: 'admin',
      phone: '7400106790',
      store: 'admin',
      activeTemplate: 'default',
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      email: 'ashishjadhav9900@gmail.com',
      password: 'Ashish@1022',
      roles: ['super-admin'],
      username: 'admin',
      phone: '7400106790',
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  })

  for (const plan of subscriptionPlans) {
    try {
      await payload.create({
        collection: 'subscription-plans',
        data: plan,
      })
      console.log(`Created template: ${plan.name}`)
    } catch (error) {
      console.error(`Error creating template ${plan.name}:`, error)
    }
  }

  console.log('🎉 All seeding operations completed successfully!')
}

await seed()
process.exit(0)
