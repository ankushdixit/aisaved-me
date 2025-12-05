import { howItWorksSteps } from "@/lib/mock-data/testimonials";

function ArrowIcon() {
  return (
    <svg
      className="w-6 h-6 text-light-300 hidden lg:block"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function StepCard({ step, showArrow }: { step: (typeof howItWorksSteps)[0]; showArrow: boolean }) {
  return (
    <>
      <div className="relative bg-light-50 border border-light-300 p-6 text-center hover:border-dark-900 transition-all">
        {/* Step Number Badge - minimal */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-dark-900 border border-dark-900 flex items-center justify-center text-white text-sm font-mono">
          {step.number}
        </div>

        <h3 className="mt-6 text-lg font-display font-normal text-dark-900">{step.title}</h3>
        <p className="mt-3 text-sm font-mono text-dark-600 leading-relaxed">{step.description}</p>
      </div>

      {showArrow && (
        <div className="flex items-center justify-center">
          <ArrowIcon />
        </div>
      )}
    </>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header - Asymmetric */}
        <div className="mb-16">
          <div className="h-px w-16 bg-dark-900 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-dark-900">
            How It Works
          </h2>
          <p className="mt-4 text-base font-mono text-dark-600">Four steps. Simple process.</p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 items-center">
          {howItWorksSteps.map((step, index) => (
            <StepCard key={step.id} step={step} showArrow={index < howItWorksSteps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
