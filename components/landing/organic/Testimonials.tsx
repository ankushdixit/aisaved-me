import { testimonials, type Testimonial } from "@/lib/mock-data/testimonials";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-[28px] shadow-soft p-7 hover:shadow-soft-hover hover:scale-102 transition-all duration-300">
      {/* Quote Mark */}
      <span className="text-4xl font-display font-bold text-terracotta leading-none">&ldquo;</span>

      {/* Quote Text */}
      <p className="mt-3 text-sm font-body text-clay-light italic leading-relaxed">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-sage/30 to-coral/30 rounded-full flex items-center justify-center text-xs font-display font-semibold text-clay">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-display font-semibold text-clay">{testimonial.author}</p>
          <p className="text-xs font-body text-sage-dark">{testimonial.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-white to-cream py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-2xl sm:text-3xl font-display font-bold text-clay mb-12">
          What Our Community Says
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
