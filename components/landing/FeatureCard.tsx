import { features, type Feature } from "@/lib/mock-data/testimonials";

function SparklesIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
      />
    </svg>
  );
}

function CheckVerifiedIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-8 h-8"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}

function FeatureIcon({ type }: { type: string }) {
  switch (type) {
    case "sparkles":
      return <SparklesIcon />;
    case "check-verified":
      return <CheckVerifiedIcon />;
    case "shield":
      return <ShieldIcon />;
    default:
      return <SparklesIcon />;
  }
}

function CustomizeMockup() {
  return (
    <div className="bg-[#FFF9E6] border-3 border-black p-4 transform rotate-1 shadow-memphis-sm">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-xs text-black mb-1 font-body font-bold">Your company:</p>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 bg-white border-2 border-black text-xs text-black w-28 font-body">
              Hertz, Avis...
            </div>
            <button className="text-xs font-display font-bold text-[#0066FF] uppercase">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="bg-[#FFF9E6] border-3 border-black p-4 space-y-2 transform -rotate-1 shadow-memphis-sm">
      <div className="bg-white border-2 border-black px-3 py-2 w-fit max-w-[80%]">
        <p className="text-xs text-black font-body">What are my legal options?</p>
      </div>
      <div className="bg-[#0066FF] border-2 border-black px-3 py-2 w-fit max-w-[80%] ml-auto">
        <p className="text-xs text-white font-body font-bold">Based on your evidence...</p>
      </div>
    </div>
  );
}

function PrivacyMockup() {
  return (
    <div className="bg-[#FFF9E6] border-3 border-black p-4 transform rotate-1 shadow-memphis-sm">
      <p className="text-xs text-black font-body">
        My name is{" "}
        <span className="inline-block px-2 py-1 bg-black text-white text-xs font-display">
          REDACTED
        </span>{" "}
        and I live
      </p>
      <p className="text-xs text-black font-body mt-1">
        at{" "}
        <span className="inline-block px-2 py-1 bg-black text-white text-xs font-display">
          REDACTED
        </span>
      </p>
    </div>
  );
}

function FeatureMockup({ type }: { type: Feature["mockupType"] }) {
  switch (type) {
    case "customize":
      return <CustomizeMockup />;
    case "chat":
      return <ChatMockup />;
    case "privacy":
      return <PrivacyMockup />;
  }
}

function FeatureCardItem({ feature, index }: { feature: Feature; index: number }) {
  const colors = ["#0066FF", "#FF1493", "#00FF7F"];
  const rotations = ["card-tilted-left", "card-tilted-right", "card-tilted-left"];
  const bgColor = colors[index % colors.length];
  const rotation = rotations[index % rotations.length];

  return (
    <div
      className={`bg-white border-4 border-black shadow-memphis-lg p-8 hover:shadow-memphis-xl transition-all duration-300 ${rotation}`}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 border-3 border-black flex items-center justify-center transform -rotate-6"
        style={{ backgroundColor: bgColor }}
      >
        <div className="text-white">
          <FeatureIcon type={feature.icon} />
        </div>
      </div>

      {/* Title & Description */}
      <h3 className="mt-6 text-2xl font-display font-bold text-black">{feature.title}</h3>
      <p className="mt-3 text-base font-body text-black leading-relaxed">{feature.description}</p>

      {/* Mockup */}
      <div className="mt-6">
        <FeatureMockup type={feature.mockupType} />
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-white py-20 border-t-4 border-b-4 border-black relative overflow-hidden">
      {/* Memphis decorative shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#FFD700] opacity-20 transform rotate-45" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#FF1493] opacity-20 rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-black text-memphis-shadow">
            What Makes Us Different
          </h2>
          <p className="mt-4 text-lg font-body font-bold text-black max-w-2xl mx-auto">
            More than just stories - tools and proof that help you win too
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCardItem key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
