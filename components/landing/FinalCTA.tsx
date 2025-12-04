import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-dark-900 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Have an AI win? Share it.
        </h2>
        <p className="mt-4 text-base text-light-400 max-w-xl mx-auto">
          Your story could help someone facing the same challenge.
        </p>

        <Link
          href="/submit"
          className="inline-flex items-center justify-center mt-8 px-10 py-4 text-base font-semibold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30 glow-primary"
        >
          Share Your Story
        </Link>
      </div>
    </section>
  );
}
