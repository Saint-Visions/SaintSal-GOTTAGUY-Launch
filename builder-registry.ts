import { type RegisteredComponent } from "@builder.io/react";

// Dynamic imports for custom components
const SaintVisionHero = () => import('./client/components/builder/SaintVisionHero').then(mod => ({ default: mod.SaintVisionHero }));
const SaintVisionFeatureGrid = () => import('./client/components/builder/SaintVisionFeatureGrid').then(mod => ({ default: mod.SaintVisionFeatureGrid }));
const SaintVisionSecurityVault = () => import('./client/components/builder/SaintVisionSecurityVault').then(mod => ({ default: mod.SaintVisionSecurityVault }));
const SaintVisionNavigation = () => import('./client/components/builder/SaintVisionNavigation').then(mod => ({ default: mod.SaintVisionNavigation }));
const SaintVisionCTA = () => import('./client/components/builder/SaintVisionCTA').then(mod => ({ default: mod.SaintVisionCTA }));

export const customComponents: RegisteredComponent[] = [
  {
    component: SaintVisionHero,
    name: 'SaintVisionHero',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'SaintSal™',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: "Cookin' Knowledge.",
        required: false,
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: "AI doesn't just answer. It adapts. It empowers. It becomes your enterprise companion.",
        required: false,
      },
      {
        name: 'ctaText',
        type: 'string',
        defaultValue: "Start Cookin' Knowledge",
        required: false,
      },
      {
        name: 'ctaLink',
        type: 'string',
        defaultValue: '/dashboard',
        required: false,
      },
      {
        name: 'secondaryCtaText',
        type: 'string',
        defaultValue: 'Try CRM Tools',
        required: false,
      },
      {
        name: 'secondaryCtaLink',
        type: 'string',
        defaultValue: '/partnertech',
        required: false,
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F317f7c64793d47ab90d506bd066bedbb?format=webp&width=800',
        required: false,
      },
      {
        name: 'logoImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: 'https://cdn.builder.io/api/v1/assets/065997bd13e4442e888a08652fcd61ba/better-saintsal-transparent-d9c734',
        required: false,
      },
      {
        name: 'badgeText',
        type: 'string',
        defaultValue: 'Enterprise Ready',
        required: false,
      },
    ],
    canHaveChildren: false,
  },
  {
    component: SaintVisionFeatureGrid,
    name: 'SaintVisionFeatureGrid',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Elite Technology',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'ENTERPRISE READY',
        required: false,
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: 'Dual AI systems handle your business operations while you focus on what matters - growing your empire.',
        required: false,
      },
      {
        name: 'features',
        type: 'list',
        subFields: [
          {
            name: 'icon',
            type: 'string',
            enum: ['brain', 'shield', 'crown', 'zap', 'users', 'globe'],
            defaultValue: 'brain',
          },
          {
            name: 'title',
            type: 'string',
            defaultValue: 'Feature Title',
          },
          {
            name: 'description',
            type: 'longText',
            defaultValue: 'Feature description goes here.',
          },
        ],
        defaultValue: [
          {
            icon: 'brain',
            title: 'Business Strategy',
            description: 'AI that analyzes market trends, automates research, and strategizes planning powered by dual AI engines.',
          },
          {
            icon: 'shield',
            title: 'CRM Integration',
            description: 'Seamlessly connect with GoHighLevel, automate follow-ups, and intelligent lead scoring.',
          },
          {
            icon: 'zap',
            title: 'Growth Analytics',
            description: 'Real-time insights with actionable intelligence to scale faster with smarter business decisions.',
          },
        ],
      },
    ],
    canHaveChildren: false,
  },
  {
    component: SaintVisionSecurityVault,
    name: 'SaintVisionSecurityVault',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Vault & Security',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'Faith-Aligned Data Protection',
        required: false,
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: 'Bank-grade security meets faith-centered values. Your data protected with military-grade encryption and ethical business practices.',
        required: false,
      },
    ],
    canHaveChildren: false,
  },
  {
    component: SaintVisionNavigation,
    name: 'SaintVisionNavigation',
    inputs: [
      {
        name: 'logoImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d',
        required: false,
      },
      {
        name: 'logoText',
        type: 'string',
        defaultValue: 'SaintVisionAI™',
        required: false,
      },
      {
        name: 'tagline',
        type: 'string',
        defaultValue: "Cookin' Knowledge",
        required: false,
      },
      {
        name: 'links',
        type: 'list',
        subFields: [
          {
            name: 'text',
            type: 'string',
            defaultValue: 'Link Text',
          },
          {
            name: 'url',
            type: 'string',
            defaultValue: '/',
          },
          {
            name: 'icon',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
            required: false,
          },
        ],
        defaultValue: [
          { text: 'Dashboard', url: '/dashboard' },
          { text: 'Pricing', url: '/pricing' },
          { text: 'Why Us', url: '/why' },
          { text: 'Help', url: '/help' },
        ],
      },
      {
        name: 'ctaButton1Text',
        type: 'string',
        defaultValue: 'Sign In',
        required: false,
      },
      {
        name: 'ctaButton1Link',
        type: 'string',
        defaultValue: '/signin',
        required: false,
      },
      {
        name: 'ctaButton2Text',
        type: 'string',
        defaultValue: "Start Cookin'",
        required: false,
      },
      {
        name: 'ctaButton2Link',
        type: 'string',
        defaultValue: '/dashboard',
        required: false,
      },
    ],
    canHaveChildren: false,
  },
  {
    component: SaintVisionCTA,
    name: 'SaintVisionCTA',
    inputs: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'Elite AI Sanctuary',
        required: false,
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'THE MOVEMENT',
        required: false,
      },
      {
        name: 'description',
        type: 'longText',
        defaultValue: "Built for those who refuse to compromise on excellence, privacy, or values. Join thousands who've discovered their GOTTA GUY®.",
        required: false,
      },
      {
        name: 'backgroundImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F89f844d10b5e4243a2178ad3de7a9f4f',
        required: false,
      },
      {
        name: 'ctaText',
        type: 'string',
        defaultValue: 'Join The Movement',
        required: false,
      },
      {
        name: 'ctaLink',
        type: 'string',
        defaultValue: '/dashboard',
        required: false,
      },
      {
        name: 'secondaryCtaText',
        type: 'string',
        defaultValue: 'Discover Your Guy',
        required: false,
      },
      {
        name: 'secondaryCtaLink',
        type: 'string',
        defaultValue: '/why',
        required: false,
      },
      {
        name: 'logoImage',
        type: 'file',
        allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg', 'webp'],
        defaultValue: 'https://cdn.builder.io/api/v1/image/assets%2F065997bd13e4442e888a08652fcd61ba%2F43517f7e94d44c8495e4734412e8899d',
        required: false,
      },
    ],
    canHaveChildren: false,
  },
];
