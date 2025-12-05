import { howItWorksSteps } from "@/lib/mock-data/testimonials";

function ArrowIcon() {
  return (
    <svg
      className="w-10 h-10 text-black hidden lg:block"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

function StepCard({ step, showArrow }: { step: (typeof howItWorksSteps)[0]; showArrow: boolean }) {
  const colors = ["#0066FF", "#FF1493", "#00FF7F", "#FFD700"];
  const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
  const bgColor = colors[(step.number - 1) % colors.length];
  const rotation = rotations[(step.number - 1) % rotations.length];

  return (
    <>
      <div
        className={`relative bg-white border-4 border-black shadow-memphis-lg p-6 text-center transform ${rotation} hover:rotate-0 transition-all`}
      >
        {/* Step Number Badge */}
        <div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 border-3 border-black flex items-center justify-center text-white font-display font-bold text-xl shadow-memphis-md"
          style={{ backgroundColor: bgColor }}
        >
          {step.number}
        </div>

        <h3 className="mt-6 text-xl font-display font-bold text-black">{step.title}</h3>
        <p className="mt-3 text-base font-body text-black leading-relaxed">{step.description}</p>
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
    <section
      id="how-it-works"
      className="bg-white py-20 border-t-4 border-b-4 border-black relative overflow-hidden"
    >
      {/* Memphis decorative shapes */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-[#00FF7F] opacity-20 rounded-full" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-[#FFD700] opacity-20 transform rotate-12" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-black text-memphis-shadow">
            How It Works
          </h2>
          <p className="mt-4 text-lg font-body font-bold text-black">
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
