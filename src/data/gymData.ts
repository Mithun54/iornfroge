export interface Program {
  id: string;
  name: string;
  category: string;
  description: string;
  level: 'All Levels' | 'Intermediate' | 'Intermediate to Advanced' | 'Advanced' | 'Bespoke';
  duration: string;
  intensity: 'Medium' | 'High' | 'Very High' | 'Maximum';
  focus: string[];
  schedule: string;
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  credentials: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface FacilityItem {
  id: string;
  title: string;
  category: 'strength' | 'cardio' | 'functional' | 'weights' | 'recovery' | 'lockers';
  categoryLabel: string;
  description: string;
  highlight: string;
  image: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  features: { text: string; included: boolean }[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  result: string;
  duration: string;
}

export const STATS = [
  { id: 'years', value: 10, suffix: '+', label: 'YEARS OF EXCELLENCE', sub: 'Pioneering elite strength since 2016' },
  { id: 'members', value: 2500, suffix: '+', label: 'ACTIVE MEMBERS', sub: 'Committed community of athletes' },
  { id: 'trainers', value: 25, suffix: '+', label: 'EXPERT COACHES', sub: 'CSCS & Olympic credentialed' },
  { id: 'facility', value: 15000, suffix: '+', label: 'SQ FT FACILITY', sub: 'Engineered biomechanical floor' },
];

export const PROGRAMS: Program[] = [
  {
    id: 'strength-conditioning',
    name: 'Strength & Conditioning',
    category: 'Power & Structure',
    description: 'Systematic barbell and compound overload designed to build maximal strength, structural bone density, and athletic durability.',
    level: 'Intermediate to Advanced',
    duration: '12-Week Periodized Cycles',
    intensity: 'High',
    focus: ['Maximal Power Output', 'Squat/Bench/Deadlift Mastery', 'Central Nervous System Conditioning'],
    schedule: '4 Sessions / Week (75 mins)',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'muscle-building',
    name: 'Muscle Building & Hypertrophy',
    category: 'Aesthetics & Density',
    description: 'Biomechanical hypertrophy science combining progressive tension, optimal resistance curves, and metabolic fatigue management.',
    level: 'All Levels',
    duration: 'Continuous Split Programming',
    intensity: 'High',
    focus: ['Hypertrophic Volume', 'Mind-Muscle Connection', 'Time-Under-Tension Protocols'],
    schedule: '5 Sessions / Week (60 mins)',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'fat-loss',
    name: 'Metabolic Fat Loss & Conditioning',
    category: 'Vascular & Stamina',
    description: 'High-density anaerobic intervals, sled sprints, and metabolic complexes to incinerate fat while preserving lean tissue mass.',
    level: 'All Levels',
    duration: '8-Week Shred Blocks',
    intensity: 'Maximum',
    focus: ['EPOC Caloric Afterburn', 'Heart-Rate Zone 4/5 Work', 'Lactate Threshold Expansion'],
    schedule: '3–4 Sessions / Week (50 mins)',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'personal-training',
    name: '1-on-1 Personal Coaching',
    category: 'Bespoke Engineering',
    description: 'Full biometric evaluation, joint-by-joint mobility assessment, and dedicated private coaching tailored to your exact physiology.',
    level: 'Bespoke',
    duration: 'Custom Quarterly Milestones',
    intensity: 'Very High',
    focus: ['Private 1:1 Attention', 'Custom Macro Nutrition', 'Kinematic Video Form Analysis'],
    schedule: 'Flexible Custom Slots',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'functional-training',
    name: 'Functional Multi-Planar Training',
    category: 'Movement & Longevity',
    description: 'Kettlebells, Bulgarian bags, steel maces, and multi-directional agility drills that build real-world resilience and bulletproof joints.',
    level: 'Intermediate',
    duration: 'Adaptive Weekly Cycles',
    intensity: 'Medium',
    focus: ['Rotational Power', 'Thoracic Mobility & Core', 'Postural Restoration'],
    schedule: '3 Sessions / Week (60 mins)',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'athletic-performance',
    name: 'Athletic High Performance',
    category: 'Speed & Explosiveness',
    description: 'Collegiate and professional sports conditioning. Plyometrics, sprint mechanics, reactive agility, and rapid force absorption.',
    level: 'Advanced',
    duration: 'Pre-Season & Competitive Phases',
    intensity: 'Maximum',
    focus: ['Vertical Leap & RFD', 'Deceleration Mechanics', 'Speed & Lateral Agility'],
    schedule: '4 Sessions / Week (75 mins)',
    image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1000&q=80',
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: 'alex-carter',
    name: 'Alex Carter',
    role: 'Head Strength Coach',
    credentials: 'CSCS • USAW Level 2 • EXOS Performance Specialist',
    experience: '12+ Years Coaching',
    specialty: 'Maximal Strength, Barbell Biomechanics & CNS Overload',
    bio: 'Former collegiate strength director who has prepared over 40 national powerlifters and collegiate athletes with calculated precision.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'ryan-wilson',
    name: 'Ryan Wilson',
    role: 'Performance Coach',
    credentials: 'B.S. Exercise Physiology • CSCS • FMS Level 2',
    experience: '9+ Years Coaching',
    specialty: 'Olympic Weightlifting, Explosive Power & Velocity-Based Training',
    bio: 'Ryan specializes in translating barbell force into kinetic speed and vertical jump performance through high-precision velocity tracking.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'daniel-brooks',
    name: 'Daniel Brooks',
    role: 'Personal Trainer & Body Specialist',
    credentials: 'NASM Master Trainer • Pre-Script Level 1 • CES',
    experience: '8+ Years Coaching',
    specialty: 'Hypertrophy Periodization, Body Composition & Joint Longevity',
    bio: 'Daniel fuses evidence-based bodybuilding principles with corrective exercise mechanics to sculpt dense, injury-free physiques.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Nutrition & Fitness Coach',
    credentials: 'M.S. Sports Nutrition • Precision Nutrition L2 • CPT',
    experience: '10+ Years Coaching',
    specialty: 'Metabolic Optimization, Lean Shredding & Performance Fueling',
    bio: 'Sarah coordinates clinical-grade dietary strategies with customized conditioning protocols to transform metabolic health and body composition.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    socials: {
      instagram: '#',
      linkedin: '#',
      twitter: '#',
    },
  },
];

export const FACILITY_ITEMS: FacilityItem[] = [
  {
    id: 'strength-area',
    title: 'Heavy Strength & Power Racks',
    category: 'strength',
    categoryLabel: 'Strength Zone',
    description: 'Custom matte-black Eleiko Prestera power racks with built-in Olympic weightlifting platforms and competition-grade calibrated plates.',
    highlight: '8 Dedicated Power Stations',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cardio-suite',
    title: 'Cardio & Biomechanics Suite',
    category: 'cardio',
    categoryLabel: 'Cardio Technology',
    description: 'Curved Woodway motorless treadmills, Concept2 RowErgs and SkiErgs, and Technogym Skillmill rigs integrated with real-time biometric monitors.',
    highlight: 'Zero-Impact Curve Drives',
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'functional-rig',
    title: 'Functional Turf & Movement Rig',
    category: 'functional',
    categoryLabel: 'Turf & Agility',
    description: '30-meter high-density sprint turf, heavy prowler sleds, Bulgarian bags, climbing ropes, and modular monkey bar rigs for unfiltered athletic output.',
    highlight: '30m Sled & Sprint Turf',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'free-weights',
    title: 'Free Weights & Dumbbell Sanctum',
    category: 'weights',
    categoryLabel: 'Free Weights',
    description: 'Urethane dumbbells calibrated in 2kg increments from 2kg up to 60kg. Commercial adjustable benches with laser-cut angle increments.',
    highlight: 'Up to 60kg Pro Dumbbells',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'recovery-lounge',
    title: 'Cryo & Hydro Recovery Lounge',
    category: 'recovery',
    categoryLabel: 'Recovery & Spa',
    description: 'Sub-zero cryotherapy, Scandinavian cedarwood dry sauna, and chilled contrast therapy plunge pools maintained strictly at 38°F (3°C).',
    highlight: 'Contrast Hydro & Infrared',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'locker-suites',
    title: 'Private Grooming & Locker Suites',
    category: 'lockers',
    categoryLabel: 'Locker Facilities',
    description: 'RFID-secured walnut lockers, rainfall showers with Malin+Goetz luxury botanicals, Dyson Supersonic styling lounges, and chilled towel service.',
    highlight: 'Keyless Walnut Lockers',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'BASIC',
    tagline: 'Essential access for disciplined independent lifters',
    monthlyPrice: 1499,
    annualPrice: 1199,
    features: [
      { text: 'Full floor & free-weight access (Mon-Sun)', included: true },
      { text: 'Digital keyless locker & sauna access', included: true },
      { text: 'Initial 60-min movement & InBody assessment', included: true },
      { text: 'IRONFORGE Member companion mobile app', included: true },
      { text: 'Complimentary electrolyte & water station', included: true },
      { text: 'Group signature masterclasses', included: false },
      { text: 'Personal trainer sessions', included: false },
      { text: 'Cold plunge & Cryo recovery lounge', included: false },
    ],
    ctaText: 'START BASIC',
  },
  {
    id: 'pro',
    name: 'PRO',
    tagline: 'Our flagship membership for serious athletic progression',
    monthlyPrice: 2499,
    annualPrice: 1999,
    isPopular: true,
    features: [
      { text: 'Unlimited 24/7 all-zone facility access', included: true },
      { text: 'Monthly InBody 770 biometric body composition scans', included: true },
      { text: 'Unlimited access to all signature group masterclasses', included: true },
      { text: 'Tailored nutrition framework & macro prescription', included: true },
      { text: '2 Complimentary guest passes per month', included: true },
      { text: 'Chilled towel & premium grooming amenities', included: true },
      { text: 'Recovery lounge access (2 sessions / month)', included: true },
      { text: 'Dedicated 1-on-1 personal coach', included: false },
    ],
    ctaText: 'CLAIM PRO ACCESS',
  },
  {
    id: 'elite',
    name: 'ELITE',
    tagline: 'The ultimate VIP tier with bespoke 1-on-1 master coaching',
    monthlyPrice: 3999,
    annualPrice: 3199,
    features: [
      { text: 'Unlimited 24/7 all-zone VIP priority access', included: true },
      { text: '4 Dedicated 1-on-1 personal coaching sessions / month', included: true },
      { text: 'Bespoke custom periodized training & macro meal plan', included: true },
      { text: 'Unlimited Cryotherapy, Sauna & Cold Plunge access', included: true },
      { text: 'Priority peak-hour rack & private suite reservations', included: true },
      { text: 'Complimentary executive laundry & locker service', included: true },
      { text: 'Unlimited VIP guest passes for training partners', included: true },
      { text: 'Signature IRONFORGE Athlete apparel & gear kit', included: true },
    ],
    ctaText: 'EXPERIENCE ELITE',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Vikram Singhania',
    role: 'Founder & Venture Capitalist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'IRONFORGE is unlike any commercial gym in the city. The caliber of the coaching, the silence and focus on the floor, and the Eleiko equipment are top-tier. My deadlift jumped 40kg while staying injury-free.',
    result: '+40kg Deadlift PR',
    duration: 'Member for 18 Months',
  },
  {
    id: 't2',
    name: 'Ananya Deshmukh',
    role: 'Corporate Attorney & Marathoner',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'The metabolic conditioning program transformed my running economy and stamina. The coaches understand biomechanics at a sports science level. Plus, the cold plunge post-workout is pure gold.',
    result: '-12% Body Fat & Marathon PR',
    duration: 'Member for 14 Months',
  },
  {
    id: 't3',
    name: 'Marcus Chen',
    role: 'Product Lead & Competitive Lifter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'You walk through the doors and immediately want to push your absolute limits. No crowded machines, no influencers filming in the way—just serious athletes and immaculate equipment.',
    result: 'Qualified for Nationals',
    duration: 'Member for 2 Years',
  },
  {
    id: 't4',
    name: 'Pooja Kashyap',
    role: 'Architect & Functional Athlete',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    quote: 'The aesthetic of the facility makes you feel like you are training in a private luxury sanctuary. The coaching team built me an asymmetrical rehab and hypertrophy routine that solved my chronic shoulder pain.',
    result: '100% Pain-Free & +5kg Muscle',
    duration: 'Member for 9 Months',
  },
];
