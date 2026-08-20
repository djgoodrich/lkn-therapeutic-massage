export const servicesData = [
  {
    id: 'therapeutic',
    title: 'Custom Therapeutic Massage',
    category: 'Therapeutic',
    tagline: 'Personalized anatomical bodywork for tension, pain, & mobility',
    description: 'Every body holds tension differently. In this session, April blends 16 years of anatomical mastery—integrating deep tissue techniques, myofascial release, trigger point therapy, and restorative flow tailored precisely to what your muscles need that day.',
    highlight: 'Includes Cupping & Steamed Hot Towels at No Extra Charge',
    durations: [
      { length: '60 Min', pricePlaceholder: '$90', focus: 'Targeted focus on 1–2 trouble areas (e.g., neck, shoulders, lumbar)' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'The recommended standard: Comprehensive full-body treatment + deep trouble area release', popular: true },
    ],
    benefits: [
      'Relief from chronic neck, back, and hip tension',
      'Improved postural alignment and range of motion',
      'Targeted trigger point and neuromuscular unwinding',
      'Integrated cupping and hot towels for deep fascial relaxation'
    ],
    isPrenatal: false,
    imagePlaceholder: 'Therapeutic Massage Session in Tranquil Moody Suite'
  },
  {
    id: 'prenatal',
    title: 'Master Prenatal Massage',
    category: 'Prenatal Care',
    tagline: 'Gentle, certified nurturing care for every trimester of motherhood',
    description: 'Carrying new life is physically demanding. April brings specialized, seasoned prenatal expertise with ergonomic side-lying positioning, supportive bolster cushioning, and safe, restorative pressure designed to alleviate pregnancy aches while honoring mother and baby.',
    highlight: 'Experienced 16-Year Specialist • Safe Trimester Positioning',
    durations: [
      { length: '60 Min', pricePlaceholder: '$90', focus: 'Targeted comfort for lower back, hips, legs, or upper shoulders' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Gentle full-body restoration, soothing hip/sciatica release, and restorative calm', popular: true },
    ],
    benefits: [
      'Alleviates pregnancy-induced lower back, pelvic, and sciatic discomfort',
      'Reduces swelling (edema) in ankles, feet, and hands',
      'Promotes restful sleep and lowers pregnancy stress hormones',
      'Side-lying ergonomic comfort with plush supportive bolsters'
    ],
    isPrenatal: true,
    imagePlaceholder: 'Gentle Prenatal Bodywork with Ergonomic Bolstering'
  },
  {
    id: 'pain-relief',
    title: 'Targeted Chronic Pain & Neck/Back Restoration',
    category: 'Therapeutic',
    tagline: 'Focused therapeutic pressure for sciatica, tech-neck, and stubborn knots',
    description: 'Designed specifically for desk workers, athletes, and anyone battling persistent discomfort. April applies targeted deep tissue and myofascial techniques combined with dynamic suction cupping to decompress tight connective tissue without excessive bruising.',
    highlight: 'Includes Decompression Cupping & Hot Towels at No Extra Charge',
    durations: [
      { length: '60 Min', pricePlaceholder: '$90', focus: 'Intensive localized focus on stubborn pain patterns' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Full kinetic chain treatment (e.g., neck-to-sacrum or glute-to-foot)', popular: true },
    ],
    benefits: [
      'Decompression of restricted muscle groups and fascial adhesions',
      'Relief from tension headaches and cervical spine strain',
      'Sciatic nerve pathway decompression and gluteal release',
      'Enhanced blood flow and accelerated tissue recovery'
    ],
    isPrenatal: false,
    imagePlaceholder: 'Targeted Deep Tissue & Myofascial Muscle Release'
  },
  {
    id: 'restorative-flow',
    title: 'Restorative Nervous System Reset',
    category: 'Therapeutic',
    tagline: 'Calming, rhythmic bodywork to melt mental fatigue and soothe sensory overload',
    description: 'When stress takes a physical toll, this session eases your nervous system out of fight-or-flight into deep healing rest. Smooth, grounding strokes paired with warm towel hydrotherapy and gentle cupping leave you deeply centered.',
    highlight: 'Steamed Towels & Soothing Aromatherapy Included',
    durations: [
      { length: '60 Min', pricePlaceholder: '$90', focus: 'Full body unwinding and nervous system grounding' },
      { length: '90 Min', pricePlaceholder: '$150', focus: 'Deep restorative reset with extended scalp, neck, and foot hydrotherapy', popular: true },
    ],
    benefits: [
      'Dampens sympathetic nervous system stress response',
      'Releases clenching in jaw, temples, shoulders, and diaphragm',
      'Warm towel compressions to melt surface muscle tension',
      'Leaves you deeply grounded, rested, and refreshed'
    ],
    isPrenatal: false,
    imagePlaceholder: 'Peaceful Ambient Spa Relaxation in Candlelight'
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
