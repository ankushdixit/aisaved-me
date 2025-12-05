import type { StoryContent as StoryContentType } from "@/lib/types/story";

interface StoryContentProps {
  content: StoryContentType;
}

export function StoryContent({ content }: StoryContentProps) {
  return (
    <div className="max-w-none">
      {/* Intro */}
      <p className="text-lg text-[#3d405b] leading-relaxed">{content.intro}</p>

      {/* The Problem */}
      <h2 className="mt-10 text-xl font-display font-semibold text-[#3d405b]">The Problem</h2>
      <p className="mt-4 text-lg text-[#5a5d7a] leading-relaxed">{content.theProblem}</p>

      {/* The Strategy */}
      <h2 className="mt-10 text-xl font-display font-semibold text-[#3d405b]">The AI Strategy</h2>
      <p className="mt-4 text-lg text-[#5a5d7a] leading-relaxed">{content.theStrategy}</p>

      {/* Quote Block */}
      {content.quote && (
        <div className="mt-8 bg-[#fff0dc] rounded-xl p-6">
          <p className="text-lg italic text-[#3d405b]">&ldquo;{content.quote.text}&rdquo;</p>
          <p className="mt-3 text-sm text-[#5a5d7a]">&mdash; {content.quote.attribution}</p>
        </div>
      )}

      {/* The Result */}
      <h2 className="mt-10 text-xl font-display font-semibold text-[#3d405b]">The Result</h2>
      <p className="mt-4 text-lg text-[#5a5d7a] leading-relaxed">{content.theResult}</p>

      {/* Key Takeaways */}
      <div className="mt-10 bg-[#e8f5e9] rounded-2xl p-6 shadow-soft">
        <h3 className="text-lg font-display font-semibold text-[#558b2f]">Key Takeaways</h3>
        <ul className="mt-4 space-y-3">
          {content.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-base text-[#3d405b]">
              <span className="text-[#81b29a] font-bold">&bull;</span>
              {takeaway}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
