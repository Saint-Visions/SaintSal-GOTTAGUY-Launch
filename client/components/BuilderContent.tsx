import React from 'react';
import { BuilderComponent, builder } from '@builder.io/react';
import { customComponents } from '../../builder-registry';

// Initialize Builder with your API key
builder.init(process.env.VITE_BUILDER_API_KEY || '065997bd13e4442e888a06852fcd61ba');

// Register custom components
customComponents.forEach((component) => {
  builder.registerComponent(component.component, component);
});

interface BuilderContentProps {
  model: string;
  content?: any;
  data?: any;
  options?: any;
}

export const BuilderContent: React.FC<BuilderContentProps> = ({
  model,
  content,
  data = {},
  options = {}
}) => {
  return (
    <BuilderComponent
      model={model}
      content={content}
      data={data}
      options={options}
    />
  );
};

export default BuilderContent;
