import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-black py-20 border-t-4 border-b-4 border-black relative overflow-hidden">
      {/* Memphis decorative shapes - on black background */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#0066FF] opacity-30 rounded-full" />
      <div className="absolute top-20 right-20 w-20 h-20 bg-[#FFD700] opacity-30 transform rotate-45" />
      <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-[#FF1493] opacity-30" />
      <div className="absolute bottom-20 right-1/4 w-16 h-16 bg-[#00FF7F] opacity-30 rounded-full" />

      {/* Squiggle decorations */}
      <svg className="absolute top-1/4 right-10 w-32 h-32 opacity-20" viewBox="0 0 100 100">
        <path d="M 10 50 Q 30 20 50 50 T 90 50" stroke="#FFD700" strokeWidth="4" fill="none" />
      </svg>
      <svg className="absolute bottom-1/3 left-20 w-28 h-28 opacity-20" viewBox="0 0 100 100">
        <path d="M 10 10 L 90 90 M 90 10 L 10 90" stroke="#00FF7F" strokeWidth="4" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white text-memphis-shadow">
          Have an AI win? Share it.
        </h2>
        <p className="mt-6 text-xl font-body font-bold text-white max-w-xl mx-auto">
          Your story could help someone facing the same challenge.
        </p>

        <Link
          href="/submit"
          className="inline-block mt-10 px-12 py-5 text-lg font-display font-bold text-black bg-[#FFD700] border-4 border-white shadow-memphis-lg transform -rotate-2 hover:rotate-0 hover:shadow-memphis-xl transition-all uppercase"
        >
          Share Your Story
        </Link>
      </div>
    </section>
  );
}
