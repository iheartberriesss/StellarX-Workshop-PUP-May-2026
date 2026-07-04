import { TierOption } from './types';

// Predefined tier choices for users who want an estimate rather than a custom goal.
export const tierOptions: TierOption[] = [
  {
    id: 'tier1',
    name: 'Tier 1: Direct Cremation / Extreme Budget',
    price: '₱15,000 – ₱40,000',
    desc: 'Basic cremation process, standard urn, no public wake, and immediate return of ashes within 24–48 hours.',
    value: 40000,
  },
  {
    id: 'tier2',
    name: 'Tier 2: Simple / Home Wake',
    price: '₱30,000 – ₱60,000',
    desc: 'Basic wooden/metal casket, home or barangay hall setup, basic embalming, and traditional burial or basic cremation.',
    value: 60000,
  },
  {
    id: 'tier3',
    name: 'Tier 3: Standard Package',
    price: '₱60,000 – ₱120,000',
    desc: 'Standard casket/urn, 3-day funeral chapel rental, professional embalming/cosmetics, hearse transportation, and memorial park coordination.',
    value: 120000,
  },
  {
    id: 'tier4',
    name: 'Tier 4: Premium Package',
    price: '₱150,000 – ₱300,000+',
    desc: 'Premium/imported casket, 5–7 day elite chapel use, full-service catering, high-end floral arrangements, and digital memorial video production.',
    value: 300000,
  },
];
