import { features, type Feature } from "@/lib/mock-data/testimonials";

function SparklesIcon() {
  return (
    <svg
      className="w-6 h-6 text-dark-900"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
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
      className="w-6 h-6 text-dark-900"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
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
      className="w-6 h-6 text-dark-900"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
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
    <div className="bg-light-50 border border-light-300 p-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-[11px] font-mono text-dark-600 mb-2">Your company:</p>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-white border border-dark-900 text-[10px] font-mono text-dark-600 w-28">
              Hertz, Avis...
            </div>
            <button className="text-[11px] font-mono text-dark-900 underline">Generate</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="bg-light-50 border border-light-300 p-4 space-y-3">
      <div className="bg-white border border-light-300 px-3 py-2 w-fit max-w-[80%]">
        <p className="text-[9px] font-mono text-dark-900">What are my legal options?</p>
      </div>
      <div className="bg-white border border-light-300 px-3 py-2 w-fit max-w-[80%] ml-auto">
        <p className="text-[9px] font-mono text-dark-900">Based on your evidence...</p>
      </div>
    </div>
  );
}

function PrivacyMockup() {
  return (
    <div className="bg-light-50 border border-light-300 p-4">
      <p className="text-[11px] font-mono text-dark-600">
        My name is{" "}
        <span className="inline-block px-2 py-0.5 bg-dark-900 text-white text-[10px] font-mono">
          REDACTED
        </span>{" "}
        and I live
      </p>
      <p className="text-[11px] font-mono text-dark-600 mt-2">
        at{" "}
        <span className="inline-block px-2 py-0.5 bg-dark-900 text-white text-[10px] font-mono">
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

function FeatureCardItem({ feature }: { feature: Feature }) {
  return (
    <div className="bg-white border border-light-300 p-8 hover:border-dark-900 transition-all">
      {/* Icon - minimal square */}
      <div className="w-12 h-12 border border-dark-900 flex items-center justify-center">
        <FeatureIcon type={feature.icon} />
      </div>

      {/* Title & Description */}
      <h3 className="mt-6 text-xl font-display font-normal text-dark-900">{feature.title}</h3>
      <p className="mt-4 text-sm font-mono text-dark-600 leading-relaxed">{feature.description}</p>

      {/* Mockup */}
      <div className="mt-6">
        <FeatureMockup type={feature.mockupType} />
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="bg-light-100 py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header - Asymmetric */}
        <div className="mb-16">
          <div className="h-px w-16 bg-dark-900 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-dark-900">
            What Makes Us Different
          </h2>
          <p className="mt-4 text-base font-mono text-dark-600 max-w-2xl">
            More than stories. Tools and proof.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCardItem key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
