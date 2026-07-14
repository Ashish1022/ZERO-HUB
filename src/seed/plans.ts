export const subscriptionPlans = [
    {
      name: "Starter",
      description: "Perfect for solo entrepreneurs launching their first online store.",
      amount: 30000,
      currency: "INR",
      period: 'monthly' as const,
      interval: 1,
      razorpayPlanId: process.env.STARTER_PLAN_ID as string,
      features: [
        { feature: "1 online storefront" },
        { feature: "Up to 100 products" },
        { feature: "500 MB media storage" },
        { feature: "2 basic storefront templates" },
        { feature: "Standard payment gateway integration" },
        { feature: "Basic content management system" },
        { feature: "SSL certificate included" },
        { feature: "Basic analytics dashboard" },
        { feature: "Email support" }
      ],
      isActive: true,
      popular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses needing automation, insights, and flexibility.",
      amount: 50000,
      currency: "INR",
      period: 'monthly' as const,
      interval: 1,
      razorpayPlanId: process.env.PROFESSIONAL_PLAN_ID as string,
      features: [
        { feature: "1 online storefront" },
        { feature: "Up to 5,000 products" },
        { feature: "10 GB media storage" },
        { feature: "10 premium storefront templates" },
        { feature: "Advanced payment gateway integration" },
        { feature: "Full content management system" },
        { feature: "Advanced media & inventory management" },
        { feature: "Custom domain support" },
        { feature: "Priority email & live chat support" },
        { feature: "Advanced analytics & performance reports" },
        { feature: "Built-in marketing tools (discounts, popups)" },
        { feature: "SEO optimization tools" },
        { feature: "Customer reviews & testimonials" }
      ],
      isActive: true,
      popular: true
    },
    {
      name: "Enterprise",
      description: "All-in-one solution for serious sellers with high-volume traffic and complex needs.",
      amount: 150000,
      currency: "INR",
      period: 'monthly' as const,
      interval: 1,
      razorpayPlanId: process.env.ENTERPRISE_PLAN_ID as string,
      features: [
        { feature: "1 online storefront" },
        { feature: "Unlimited products" },
        { feature: "100 GB media storage with CDN" },
        { feature: "All premium templates + custom designs" },
        { feature: "Multi-gateway & custom payment flows" },
        { feature: "Enterprise-grade content management" },
        { feature: "Advanced performance optimization" },
        { feature: "Multiple custom domains" },
        { feature: "Advanced analytics & data export" },
        { feature: "SEO & marketing automation tools" },
        { feature: "Multi-location inventory system" },
        { feature: "Customer segmentation & insights" },
        { feature: "API access for full integration" },
        { feature: "White-label branding options" },
        { feature: "24/7 support with dedicated manager" },
        { feature: "Custom integrations & onboarding" },
        { feature: "Advanced security & compliance" }
      ],
      isActive: true,
      popular: false
    }
  ];
  