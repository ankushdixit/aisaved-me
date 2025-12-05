import { testimonials, type Testimonial } from "@/lib/mock-data/testimonials";

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const rotations = ["card-tilted-left", "card-tilted-right", ""];
  const bgColors = ["#FFF9E6", "#FFFFFF", "#FFF9E6"];
  const rotation = rotations[index % rotations.length];
  const bgColor = bgColors[index % bgColors.length];

  return (
    <div
      className={`bg-white border-4 border-black shadow-memphis-md p-6 hover:shadow-memphis-lg transition-all ${rotation} hover:rotate-0`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Quote Mark */}
      <span className="text-5xl font-display font-bold text-black leading-none">&ldquo;</span>

      {/* Quote Text */}
      <p className="mt-2 text-base font-body text-black leading-relaxed">{testimonial.quote}</p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-[#0066FF] border-3 border-black flex items-center justify-center text-sm font-display font-bold text-white">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-base font-body font-bold text-black">{testimonial.author}</p>
          <p className="text-sm font-body text-gray-600">{testimonial.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-pattern-dots py-20 border-t-4 border-b-4 border-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-3xl sm:text-4xl font-display font-bold text-black mb-12 text-memphis-shadow">
          What Our Community Says
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
