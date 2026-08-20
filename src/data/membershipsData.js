export const membershipsData = {
  headline: 'The LKN Wellness Memberships',
  subheading: 'Consistent care for lasting relief. Prioritize your physical and mental well-being with monthly restorative sessions at preferred member pricing.',
  guaranteeText: 'Unused sessions roll over month-to-month. No rigid lock-ins—pause or cancel anytime with 30 days notice.',
  tiers: [
    {
      id: 'essential',
      name: 'The Essential Reset',
      duration: '60 Minutes / Month',
      price: '$100',
      savings: 'Save $10 Every Month (vs $110 Single Visit)',
      popular: false,
      description: 'Ideal for ongoing maintenance, tension prevention, and a dedicated monthly hour of restorative escape.',
      includes: [
        'One (1) 60-Minute Custom Therapeutic or Prenatal Session per month ($100 vs $110)',
        'Includes Cupping & Steamed Hot Towels ($0 upcharge always)',
        'Unused sessions rollover automatically each month',
        'Book additional 60-minute sessions at the discounted $100 member rate',
        'Transfer 1 session per quarter to a family member or friend'
      ],
      ctaText: 'Join 60-Min Membership ($100/mo)'
    },
    {
      id: 'restorative',
      name: 'The Restorative Journey',
      duration: '90 Minutes / Month',
      price: '$140',
      savings: 'Save $10 Every Month (vs $150 Single Visit)',
      popular: true,
      badge: 'MOST POPULAR',
      description: 'The golden standard for chronic pain sufferers, desk professionals, and expecting mothers needing comprehensive full-body unwinding.',
      includes: [
        'One (1) 90-Minute Custom Therapeutic or Prenatal Session per month ($140 vs $150)',
        'Includes Cupping & Steamed Hot Towels ($0 upcharge always)',
        'Unused sessions rollover automatically each month',
        'Priority booking access for prime evening & weekend slots',
        'Book additional 90-minute sessions at the discounted $140 member rate',
        'Transfer up to 2 sessions per year to a loved one',
        'Complimentary aromatic essential oil infusion'
      ],
      ctaText: 'Join 90-Min Membership ($140/mo)'
    }
  ],
  perks: [
    {
      title: 'Roll-Over Guarantee',
      desc: 'Busy month? Your unused sessions never disappear. They roll forward as long as your membership is active.'
    },
    {
      title: 'No Surprise Upcharges',
      desc: 'Cupping therapy, hot towel hydrotherapy, and specialized prenatal positioning remain 100% all-inclusive.'
    },
    {
      title: 'Share With Loved Ones',
      desc: 'Need to gift a session to a partner, friend, or expecting mother? Easily transfer eligible sessions.'
    },
    {
      title: 'Discounted Extra Sessions',
      desc: 'Book as many additional sessions as you need throughout the month at your exclusive discounted member rate ($100/60m, $140/90m).'
    }
  ]
};
