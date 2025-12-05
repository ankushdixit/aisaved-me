import { testimonials, type Testimonial } from "@/lib/mock-data/testimonials";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white border border-light-300 p-6 hover:border-dark-900 transition-all">
      {/* Quote Mark - minimal */}
      <span className="text-3xl font-display text-dark-900 leading-none">&ldquo;</span>

      {/* Quote Text */}
      <p className="mt-3 text-sm font-mono text-dark-600 italic leading-relaxed">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar - square minimal */}
        <div className="w-9 h-9 border border-dark-900 flex items-center justify-center text-xs font-mono text-dark-900">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-mono text-dark-900">{testimonial.author}</p>
          <p className="text-xs font-mono text-dark-600 mt-1">{testimonial.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-light-100 py-20">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header - Asymmetric */}
        <div className="mb-16">
          <div className="h-px w-16 bg-dark-900 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-display font-normal text-dark-900">
            What Our Community Says
          </h2>
        </div>

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
