import { servicesData, estheticianAddOns } from './servicesData';

/**
 * Tissue layers used by the depth diagrams (surface → deepest).
 */
export const TISSUE_LAYERS = [
  'Epidermis',
  'Dermis',
  'Superficial fascia',
  'Skeletal muscle',
  'Deep fascia',
];

/**
 * Per-treatment metadata layered on top of servicesData (single source of truth
 * for copy + pricing stays in servicesData.js).
 */
const META = {
  swedish: {
    mood: 'stress',
    depth: 3,
    system: 'Parasympathetic',
    short: 'Swedish',
    pressure: 'Flowing',
  },
  'deep-tissue': {
    mood: 'deep',
    depth: 5,
    system: 'Myofascial',
    short: 'Deep Tissue',
    pressure: 'Firm → structural',
  },
  'pain-relief': {
    mood: 'pain',
    depth: 5,
    system: 'Neuromuscular',
    short: 'Pain Restoration',
    pressure: 'Targeted · adaptive',
  },
  prenatal: {
    mood: 'prenatal',
    depth: 3,
    system: 'Circulatory',
    short: 'Prenatal',
    pressure: 'Gentle · supported',
  },
  'antioxidant-detox-facial': {
    mood: 'esthetics',
    depth: 1,
    system: 'Integumentary',
    short: 'Detox Facial',
    pressure: 'Enzyme resurfacing',
  },
  'dermaplaning-facial': {
    mood: 'esthetics',
    depth: 1,
    system: 'Integumentary',
    short: 'Dermaplaning',
    pressure: 'Mechanical exfoliation',
  },
  'chemical-peel': {
    mood: 'esthetics',
    depth: 2,
    system: 'Integumentary',
    short: 'Chemical Peel',
    pressure: 'Chemical exfoliation',
  },
};

export const treatments = servicesData.map((s) => ({
  ...s,
  ...META[s.id],
  kind: s.serviceType === 'esthetician' ? 'esthetics' : 'massage',
  fromPrice: s.durations[0]?.pricePlaceholder,
}));

export const addOns = estheticianAddOns;

/**
 * Journey dial stations. Order = clockwise from top.
 */
export const journeyStations = [
  {
    id: 'stress',
    mood: 'stress',
    label: 'Stress Relief',
    kicker: 'Down-regulate',
    line: 'Long, rhythmic strokes that quiet a nervous system stuck in “on.”',
    serviceIds: ['swedish'],
  },
  {
    id: 'deep',
    mood: 'deep',
    label: 'Deep Tissue',
    kicker: 'Release',
    line: 'Slow, anatomical work into the layers where old tension is stored.',
    serviceIds: ['deep-tissue'],
  },
  {
    id: 'pain',
    mood: 'pain',
    label: 'Pain Restoration',
    kicker: 'Restore',
    line: 'Clinical focus for tech-neck, sciatica and the patterns that keep returning.',
    serviceIds: ['pain-relief'],
  },
  {
    id: 'prenatal',
    mood: 'prenatal',
    label: 'Prenatal',
    kicker: 'Support',
    line: 'Side-lying, fully bolstered care for every trimester.',
    serviceIds: ['prenatal'],
  },
  {
    id: 'esthetics',
    mood: 'esthetics',
    label: 'Esthetics',
    kicker: 'Renew',
    line: 'Clinical facials with Katelynn — resurfacing, detox and cell renewal.',
    serviceIds: ['antioxidant-detox-facial', 'dermaplaning-facial', 'chemical-peel'],
  },
];

export const PRESSURE_STEPS = ['Feather', 'Flowing', 'Firm', 'Structural'];

export const MASSAGE_INCLUSIONS = [
  { id: 'cupping', label: 'Decompression cupping' },
  { id: 'towels', label: 'Steamed herbal towels' },
  { id: 'aroma', label: 'Aromatherapy, on request' },
];
