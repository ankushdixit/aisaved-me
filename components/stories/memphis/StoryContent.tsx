import type { StoryContent as StoryContentType } from "@/lib/types/story";

interface StoryContentProps {
  content: StoryContentType;
}

export function StoryContent({ content }: StoryContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Intro */}
      <p className="text-lg font-body text-gray-700 leading-relaxed">{content.intro}</p>

      {/* The Problem */}
      <h2 className="mt-10 text-2xl font-display font-bold text-black">The Problem</h2>
      <p className="mt-4 text-lg font-body text-gray-700 leading-relaxed">{content.theProblem}</p>

      {/* The Strategy */}
      <h2 className="mt-10 text-2xl font-display font-bold text-black">The AI Strategy</h2>
      <p className="mt-4 text-lg font-body text-gray-700 leading-relaxed">{content.theStrategy}</p>

      {/* Quote Block */}
      {content.quote && (
        <div className="mt-8 bg-gray-100 border-l-4 border-[#0066FF] p-6">
          <p className="text-lg font-body italic text-gray-800">
            &ldquo;{content.quote.text}&rdquo;
          </p>
          <p className="mt-3 text-sm font-body text-gray-600">
            &mdash; {content.quote.attribution}
          </p>
        </div>
      )}

      {/* The Result */}
      <h2 className="mt-10 text-2xl font-display font-bold text-black">The Result</h2>
      <p className="mt-4 text-lg font-body text-gray-700 leading-relaxed">{content.theResult}</p>

      {/* Key Takeaways */}
      <div className="mt-10 bg-[#eff6ff] border-3 border-black p-6">
        <h3 className="text-xl font-display font-bold text-[#0066FF]">Key Takeaways</h3>
        <ul className="mt-4 space-y-2">
          {content.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-2 text-base font-body text-gray-800">
              <span className="text-[#0066FF] font-bold">&bull;</span>
              {takeaway}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
