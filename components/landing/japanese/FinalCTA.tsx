import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-white py-24 border-t border-light-300">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Asymmetric layout */}
        <div className="max-w-2xl">
          <div className="h-px w-24 bg-dark-900 mb-8" />
          <h2 className="text-3xl sm:text-4xl font-display font-normal text-dark-900 leading-tight">
            Have an AI win?
            <br />
            Share it.
          </h2>
          <p className="mt-6 text-base font-mono text-dark-600 leading-relaxed">
            Your story could help someone facing the same challenge.
          </p>

          <Link
            href="/submit"
            className="inline-flex items-center justify-center mt-10 px-10 py-4 text-sm font-mono text-light-50 bg-dark-900 border border-dark-900 hover:bg-dark-800 transition-all"
          >
            Share Your Story
          </Link>
        </div>
      </div>
    </section>
  );
}
