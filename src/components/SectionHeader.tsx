import React from 'react';

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ subtitle, title }) => {
  return (
    <div className="text-center mb-16">
      {subtitle && (
        <span className="block mb-3 text-sm uppercase tracking-widest font-light text-accent">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-serif mb-4 text-primary">
        {title}
      </h2>
      <div className="w-24 h-0.5 mx-auto bg-accent/30" />
    </div>
  );
};

export default SectionHeader;
