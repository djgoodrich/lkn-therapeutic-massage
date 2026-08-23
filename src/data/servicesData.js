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
  }
];

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
