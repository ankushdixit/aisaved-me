import { howItWorksSteps } from "@/lib/mock-data/testimonials";

function ArrowIcon() {
  return (
    <svg
      className="w-8 h-8 text-sage/40 hidden lg:block"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function StepCard({ step, showArrow }: { step: (typeof howItWorksSteps)[0]; showArrow: boolean }) {
  return (
    <>
      <div className="relative bg-white rounded-[28px] shadow-soft p-6 text-center hover:shadow-soft-hover transition-all duration-300">
        {/* Step Number Badge */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-terracotta to-terracotta-dark rounded-full flex items-center justify-center text-white font-display font-bold shadow-soft">
          {step.number}
        </div>

        <h3 className="mt-6 text-lg font-display font-bold text-clay">{step.title}</h3>
        <p className="mt-3 text-sm font-body text-clay-light leading-relaxed">{step.description}</p>
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
    <section id="how-it-works" className="bg-gradient-to-br from-cream-dark to-cream py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-clay">How It Works</h2>
          <p className="mt-4 text-base font-body text-clay-light">
            From your win to helping others - in four simple steps
          </p>
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
