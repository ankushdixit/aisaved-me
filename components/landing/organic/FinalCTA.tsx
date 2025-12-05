import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-br from-[#FFF8F0] via-[#FFF0DC] to-[#FFE8CC] py-24 overflow-hidden">
      {/* Floating organic blobs */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-sage/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl animate-float" />
      <div
        className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-coral/20 rounded-[40%_60%_70%_30%/40%_60%_30%_70%] blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-clay">
          Have an AI win? Share it.
        </h2>
        <p className="mt-5 text-base font-body text-clay-light max-w-xl mx-auto">
          Your story could help someone facing the same challenge.
        </p>

        <Link
          href="/submit"
          className="inline-flex items-center justify-center mt-10 px-12 py-4 text-base font-display font-semibold text-white bg-terracotta rounded-full hover:bg-terracotta-dark transition-all duration-300 shadow-soft hover:shadow-soft-hover hover:scale-105"
        >
          Share Your Story
        </Link>
      </div>
    </section>
  );
}
