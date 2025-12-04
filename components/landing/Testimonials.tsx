import { testimonials, type Testimonial } from "@/lib/mock-data/testimonials";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-light-50 rounded-xl p-6 hover:bg-light-100 transition-colors">
      {/* Quote Mark */}
      <span className="text-4xl font-bold text-dark-900 leading-none">
        &ldquo;
      </span>

      {/* Quote Text */}
      <p className="mt-2 text-sm text-dark-600 italic leading-relaxed">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        {/* Avatar */}
        <div className="w-9 h-9 bg-light-300 rounded-full flex items-center justify-center text-xs font-medium text-dark-600">
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-dark-900">
            {testimonial.author}
          </p>
          <p className="text-xs text-light-400">{testimonial.outcome}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-dark-900 mb-10">
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
