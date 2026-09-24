export const servicesData = [
  {
    id: 'swedish',
    title: 'Swedish Massage',
    category: 'Swedish Relaxation',
    tagline: 'Classic restorative bodywork to ease sensory overload, soothe muscles, & melt stress',
    description: 'A quintessential full-body relaxation experience designed to calm the nervous system, enhance circulation, and melt away daily tension. April combines long, flowing gliding strokes (effleurage), gentle kneading, and rhythmic flow with complimentary steamed herbal hot towels and soothing aromatherapy to leave you deeply restored.',
    highlight: 'Steamed Towels & Soothing Aromatherapy Included',
    durations: [
      { length: '60 Min', pricePlaceholder: '$110', focus: 'Full body unwinding and nervous system grounding' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Deep restorative reset with extended scalp, neck, and foot hydrotherapy', popular: true },
    ],
    benefits: [
      'Calms the nervous system and dampens sympathetic stress response',
      'Smooth, rhythmic strokes to enhance full-body circulation',
      'Steamed hot towel compressions to melt surface muscle tension',
      'Leaves you deeply grounded, peaceful, and refreshed'
    ],
    isPrenatal: false,
    image: '/images/reception-lounge.jpg',
    imageAlt: 'LKN Therapeutic Massage welcoming reception sanctuary in Cornelius, NC',
    imagePlaceholder: 'LKN Sanctuary & Relaxation Lounge'
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    category: 'Deep Tissue Therapeutic',
    tagline: 'Personalized anatomical bodywork for stubborn knots, tension, & restricted mobility',
    description: 'Every body holds tension differently. In this session, April blends 16 years of anatomical mastery—integrating focused deep tissue techniques, myofascial release, trigger point therapy, and restorative flow tailored precisely to what your muscles need that day.',
    highlight: 'Includes Cupping & Steamed Hot Towels at No Extra Charge',
    durations: [
      { length: '60 Min', pricePlaceholder: '$110', focus: 'Targeted focus on 1–2 trouble areas (e.g., neck, shoulders, lumbar)' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'The recommended standard: Comprehensive full-body treatment + deep trouble area release', popular: true },
    ],
    benefits: [
      'Relief from chronic neck, back, and hip tension',
      'Targeted trigger point and neuromuscular unwinding',
      'Improved postural alignment and range of motion',
      'Integrated cupping and hot towels for deep fascial relaxation'
    ],
    isPrenatal: false,
    image: '/images/massage-suite.jpg',
    imageAlt: 'LKN Therapeutic Massage tranquil moody massage suite in Cornelius, NC',
    imagePlaceholder: 'Therapeutic Deep Tissue Massage Suite'
  },
  {
    id: 'prenatal',
    title: 'Master Prenatal Massage',
    category: 'Prenatal Care',
    tagline: 'Gentle, certified nurturing care for every trimester of motherhood',
    description: 'Carrying new life is physically demanding. April brings specialized, seasoned prenatal expertise with ergonomic side-lying positioning, supportive bolster cushioning, and safe, restorative pressure designed to alleviate pregnancy aches while honoring mother and baby.',
    highlight: 'Experienced 16-Year Specialist • Safe Trimester Positioning',
    durations: [
      { length: '60 Min', pricePlaceholder: '$110', focus: 'Targeted comfort for lower back, hips, legs, or upper shoulders' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Gentle full-body restoration, soothing hip/sciatica release, and restorative calm', popular: true },
    ],
    benefits: [
      'Alleviates pregnancy-induced lower back, pelvic, and sciatic discomfort',
      'Reduces swelling (edema) in ankles, feet, and hands',
      'Promotes restful sleep and lowers pregnancy stress hormones',
      'Side-lying ergonomic comfort with plush supportive bolsters'
    ],
    isPrenatal: true,
    image: '/images/massage-suite.jpg',
    imageAlt: 'Private prenatal massage suite with ergonomic bolstering in Cornelius, NC',
    imagePlaceholder: 'Master Prenatal Bodywork Suite'
  },
  {
    id: 'pain-relief',
    title: 'Targeted Chronic Pain & Neck Restoration',
    category: 'Clinical Therapeutic',
    tagline: 'Focused clinical bodywork for sciatica, tech-neck, and persistent dysfunction',
    description: 'Designed specifically for desk workers, athletes, and anyone battling persistent discomfort. April applies targeted deep tissue and myofascial techniques combined with dynamic suction cupping to decompress tight connective tissue without excessive bruising.',
    highlight: 'Includes Decompression Cupping & Hot Towels at No Extra Charge',
    durations: [
      { length: '60 Min', pricePlaceholder: '$110', focus: 'Intensive localized focus on stubborn pain patterns' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Full kinetic chain treatment (e.g., neck-to-sacrum or glute-to-foot)', popular: true },
    ],
    benefits: [
      'Decompression of restricted muscle groups and fascial adhesions',
      'Relief from tension headaches and cervical spine strain',
      'Sciatic nerve pathway decompression and gluteal release',
      'Enhanced blood flow and accelerated tissue recovery'
    ],
    isPrenatal: false,
    image: '/images/reception-lounge.jpg',
    imageAlt: 'Targeted chronic pain and neck restoration at LKN Therapeutic Massage in Cornelius, NC',
    imagePlaceholder: 'Targeted Deep Tissue & Myofascial Muscle Release'
  },
  {
    id: 'antioxidant-detox-facial',
    title: 'Antioxidant Detox Facial',
    category: 'Esthetician Services',
    serviceType: 'esthetician',
    tagline: 'Oxygenating facial with advanced enzyme exfoliation for a healthy, radiant glow',
    description: 'An oxygenating facial that detoxes the skin, uses advanced enzyme exfoliation, and leaves the skin with a radiant glow! Great for all skin types and addresses all skin concerns such as dehydration, fine lines and wrinkles, uneven skin tone, dullness, and acne-prone skin.',
    highlight: 'Oxygenating Detox • Advanced Enzyme Exfoliation',
    durations: [
      { length: '50 Min', pricePlaceholder: '$110', focus: 'Oxygenating detox, enzyme resurfacing & radiant skin glow', popular: true }
    ],
    benefits: [
      'Oxygenates and deeply detoxifies congested skin',
      'Advanced enzyme exfoliation sweeps away dull surface buildup',
      'Addresses dehydration, fine lines, wrinkles, and dullness',
      'Balances uneven skin tone and calms acne-prone skin'
    ],
    provider: 'Katelynn Hargrove, Lead Master Medical Esthetician (6 Yrs Exp)',
    image: '/images/katelynn-hargrove.jpg',
    imageAlt: 'Lead Master Medical Esthetician Katelynn Hargrove performing Antioxidant Detox Facial in Cornelius, NC',
    imagePlaceholder: 'Antioxidant Detox & Enzyme Facial'
  },
  {
    id: 'dermaplaning-facial',
    title: 'Dermaplaning Facial',
    category: 'Esthetician Services',
    serviceType: 'esthetician',
    tagline: 'Total skin reset removing dead skin & peach fuzz for a smooth, bright complexion',
    description: 'Get ready to give your skin a total reset! Dermaplaning is used to remove the top layer of dead skin and peach fuzz. This facial helps improve skin’s texture, better product absorption, and gives the skin a smoother and brighter complexion overall.',
    disclaimer: 'No steamer or massage included. Not recommended for active acne or nickel/silver allergies.',
    highlight: 'Dead Skin & Peach Fuzz Removal • Instant Glow',
    durations: [
      { length: '50 Min', pricePlaceholder: '$150', focus: 'Epidermal reset, peach fuzz removal & boosted absorption', popular: true }
    ],
    benefits: [
      'Removes top layer of dead skin cells and peach fuzz (vellus hair)',
      'Dramatically improves topical serum and product absorption',
      'Noticeably refines skin texture for a silky-smooth finish',
      'Leaves skin with an immediately brighter, glowing complexion'
    ],
    provider: 'Katelynn Hargrove, Lead Master Medical Esthetician (6 Yrs Exp)',
    image: '/images/massage-suite.jpg',
    imageAlt: 'Dermaplaning facial treatment at LKN Therapeutic Massage in Cornelius, NC',
    imagePlaceholder: 'Dermaplaning Facial Suite'
  },
  {
    id: 'chemical-peel',
    title: 'Chemical Peel',
    category: 'Esthetician Services',
    serviceType: 'esthetician',
    tagline: 'Clinical exfoliation process encouraging cell turnover for fresh, healthy skin',
    description: 'Exfoliation process, encouraging cell turnover that leaves the skin looking fresh and healthy. Improvements in the texture, tone, fine lines and wrinkles, and overall appearance of the skin.',
    highlight: 'Encourages Rapid Cell Turnover & Renewal',
    durations: [
      { length: '50 Min', pricePlaceholder: '$200', focus: 'Customized clinical chemical peel for texture, tone & fine lines', popular: true }
    ],
    benefits: [
      'Encourages rapid cellular turnover and skin regeneration',
      'Noticeably improves skin texture, tone, and smoothness',
      'Softens appearance of fine lines and wrinkles',
      'Leaves skin looking fresh, healthy, and revitalized'
    ],
    provider: 'Katelynn Hargrove, Lead Master Medical Esthetician (6 Yrs Exp)',
    image: '/images/reception-lounge.jpg',
    imageAlt: 'Clinical chemical peel treatment at LKN Therapeutic Massage in Cornelius, NC',
    imagePlaceholder: 'Clinical Chemical Peel'
  }
];

export const estheticianAddOns = [
  {
    id: 'high-frequency',
    title: 'High Frequency Treatment',
    price: '$10',
    category: 'Esthetician Add-On',
    highlight: 'Electrical Antibacterial Treatment',
    description: 'High frequency is an electrical treatment that kills bacteria and reduces the appearance of active acne.',
    benefits: [
      'Targeted electrical frequency kills acne-causing bacteria',
      'Reduces inflammation, swelling, and redness on active breakouts',
      'Stimulates microcirculation to accelerate cellular healing'
    ]
  }
];

export const leadEsthetician = {
  name: 'Katelynn Hargrove',
  title: 'Lead Master Medical Esthetician',
  experience: '6 Years Experience',
  image: '/images/katelynn-hargrove.jpg',
  quote: 'Healthy, radiant skin starts with clinical precision, advanced cellular renewal, and attentive personalized care.',
  bio: [
    'LKN Therapeutic Massage is thrilled to introduce Katelynn Hargrove as our Lead Master Medical Esthetician. Bringing 6 years of specialized clinical skincare expertise, Katelynn elevates our practice with advanced, results-driven medical aesthetics.',
    'Katelynn specializes in customized clinical treatments including oxygenating Antioxidant Detox Facials, precision Dermaplaning resurfacing, targeted Chemical Peels, and High Frequency antibacterial acne therapy.',
    'Her approach combines medical-grade exfoliation and deep cellular turnover with meticulous care—giving your skin a complete, luminous reset in our serene Lake Norman sanctuary.'
  ],
  specialties: [
    { title: 'Antioxidant Detox Facial', duration: '50 Min', price: '$110' },
    { title: 'Dermaplaning Facial', duration: '50 Min', price: '$150' },
    { title: 'Chemical Peel', duration: '50 Min', price: '$200' },
    { title: 'High Frequency Add-On', duration: 'Add-On', price: '$10' }
  ]
};

export const signatureAmenities = [
  {
    title: 'Integrated Cupping Therapy',
    subtitle: 'Myofascial Decompression',
    badge: 'ALWAYS $0 UPCHARGE',
    description: 'While other clinics charge $25 to $40 extra for cupping, April believes essential therapeutic tools should be available to every client who benefits from them. Gentle suction decompresses tight fascial layers, lifts stagnated fluids, and restores microcirculation.',
    details: 'April customizes static or dynamic sliding cupping based on your tissue needs and comfort level.',
    iconName: 'Sparkles'
  },
  {
    title: 'Steamed Herbal Hot Towels',
    subtitle: 'Hydrothermal Relaxation',
    badge: 'ALWAYS $0 UPCHARGE',
    description: 'Infused steamed towels are applied to the back, neck, and feet during your session. The penetrating moist heat softens rigid muscle fibers before deep work, opens pores, and invites a profound state of sensory surrender.',
    details: 'Applied seamlessly throughout your session to elevate comfort and therapeutic efficacy.',
    iconName: 'Flame'
  },
  {
    title: '100% Customized Pressure',
    subtitle: 'No One-Size-Fits-All',
    badge: 'MASTER THERAPEUTIC TOUCH',
    description: 'From gentle circulatory flow to firm therapeutic release, April communicates and listens attentively to your body’s signals. Pressure is calibrated specifically to your pain threshold—never painful, always productive.',
    details: '16 years of hands-on experience guiding every stroke.',
    iconName: 'ShieldCheck'
  }
];
