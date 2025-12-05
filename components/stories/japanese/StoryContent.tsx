import type { StoryContent as StoryContentType } from "@/lib/types/story";

interface StoryContentProps {
  content: StoryContentType;
}

export function StoryContent({ content }: StoryContentProps) {
  return (
    <div className="max-w-none">
      {/* Intro */}
      <p className="text-lg text-[#1a1a1a] leading-relaxed">{content.intro}</p>

      {/* The Problem */}
      <h2 className="mt-12 text-xl text-[#1a1a1a]">The Problem</h2>
      <p className="mt-4 text-lg text-[#1a1a1a] leading-relaxed">{content.theProblem}</p>

      {/* The Strategy */}
      <h2 className="mt-12 text-xl text-[#1a1a1a]">The AI Strategy</h2>
      <p className="mt-4 text-lg text-[#1a1a1a] leading-relaxed">{content.theStrategy}</p>

      {/* Quote Block */}
      {content.quote && (
        <div className="mt-8 bg-[#f5f2ed] border-l-2 border-[#1a1a1a] p-6">
          <p className="text-lg italic text-[#1a1a1a]">&ldquo;{content.quote.text}&rdquo;</p>
          <p className="mt-3 text-sm text-[#6b6b6b]">&mdash; {content.quote.attribution}</p>
        </div>
      )}

      {/* The Result */}
      <h2 className="mt-12 text-xl text-[#1a1a1a]">The Result</h2>
      <p className="mt-4 text-lg text-[#1a1a1a] leading-relaxed">{content.theResult}</p>

      {/* Key Takeaways */}
      <div className="mt-12 bg-[#faf8f5] border border-[#d4d0c8] p-6">
        <h3 className="text-lg text-[#1a1a1a]">Key Takeaways</h3>
        <ul className="mt-4 space-y-3">
          {content.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-base text-[#1a1a1a]">
              <span className="text-[#c41e3a]">&bull;</span>
              {takeaway}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
