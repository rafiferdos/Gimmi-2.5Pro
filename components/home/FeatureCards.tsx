import { FeatureCard } from './FeatureCard';

export const FeatureCards = () => {
  const features = [
    { icon: "💬", title: "Smart Conversations", description: "Engage in natural, context-aware discussions" },
    { icon: "🎨", title: "Creative Assistant", description: "Generate content, ideas, and creative solutions" },
    { icon: "📚", title: "Knowledge Explorer", description: "Deep dive into any topic with expert insights" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};