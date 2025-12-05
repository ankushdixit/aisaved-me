import Link from "next/link";
import { categoryStats, type CategoryStats } from "@/lib/mock-data/stories";

function CategoryCardItem({ category }: { category: CategoryStats }) {
  return (
    <Link
      href={`/stories?category=${category.category}`}
      className="group block bg-white border border-light-300 border-l-2 p-6 hover:border-dark-900 transition-all"
      style={{
        borderLeftColor: "#C41E3A", // Hanko red accent - used sparingly
      }}
    >
      <h3 className="text-xl font-display font-normal text-dark-900 group-hover:text-dark-600 transition-colors">
        {category.label}
      </h3>
      <p className="mt-3 text-sm font-mono text-dark-600">{category.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-display font-normal text-dark-900">
            {category.storyCount}
          </span>
          <span className="text-sm font-mono text-dark-600">stories</span>
        </div>

        <span className="text-sm font-mono text-dark-900 group-hover:underline">Explore</span>
      </div>
    </Link>
  );
}

export function CategoryCards() {
  return (
    <section className="bg-light-50 py-16">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        {/* Section Header - Asymmetric */}
        <div className="mb-12">
          <div className="h-px w-16 bg-dark-900 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-display font-normal text-dark-900">
            Jump Into a Category
          </h2>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {categoryStats.map((category) => (
            <CategoryCardItem key={category.category} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
