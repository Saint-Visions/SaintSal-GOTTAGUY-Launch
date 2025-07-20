import { builder } from '@builder.io/react';
import { customComponents } from '../../builder-registry';

// Initialize Builder.io with comprehensive settings
export const initializeBuilderComprehensive = () => {
  const BUILDER_API_KEY = import.meta.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba';
  
  // Initialize Builder
  builder.init(BUILDER_API_KEY);
  
  // Register all custom components
  customComponents.forEach((component) => {
    builder.registerComponent(component.component, component);
  });
  
  // Enable analytics and tracking
  builder.canTrack = true;
  
  // Set up Builder.io environment
  if (import.meta.env.BUILDER_ENVIRONMENT) {
    builder.env = import.meta.env.BUILDER_ENVIRONMENT;
  }
  
  // Configure Builder.io settings for your SaintVisionAI project
  builder.setUserAgent('SaintVisionAI/1.0');
  
  // Enable preview mode for development
  if (import.meta.env.DEV) {
    builder.prerender = false;
    builder.cachebust = true;
  }
  
  console.log('Builder.io initialized for SaintVisionAI with API key:', BUILDER_API_KEY);
  
  return builder;
};

export { builder };
