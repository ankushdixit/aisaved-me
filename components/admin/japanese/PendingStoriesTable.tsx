"use client";

import { type PendingStory } from "@/lib/mock-data/pending-stories";

interface PendingStoriesTableProps {
  stories: PendingStory[];
  // eslint-disable-next-line no-unused-vars
  onView: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onApprove: (story: PendingStory) => void;
  // eslint-disable-next-line no-unused-vars
  onReject: (story: PendingStory) => void;
}

function getCategoryStyles(category: PendingStory["category"]) {
  switch (category) {
    case "legal":
      return "bg-[#f5f2ed] text-[#6b6b6b] border-[#d4d0c8]";
    case "medical":
      return "bg-[#faf8f5] text-[#6b6b6b] border-[#d4d0c8]";
    case "financial":
      return "bg-[#f5f2ed] text-[#6b6b6b] border-[#d4d0c8]";
    default:
      return "bg-[#f5f2ed] text-[#6b6b6b] border-[#d4d0c8]";
  }
}

function getStatusStyles(status: PendingStory["status"]) {
  switch (status) {
    case "pending":
      return "bg-[#f5f2ed] text-[#6b6b6b]";
    case "approved":
      return "bg-[#1a1a1a] text-[#faf8f5]";
    case "published":
      return "bg-[#c41e3a] text-white";
    case "rejected":
      return "bg-[#6b6b6b] text-white";
  }
}

export function PendingStoriesTable({
  stories,
  onView,
  onApprove,
  onReject,
}: PendingStoriesTableProps) {
  return (
    <div className="bg-[#faf8f5] border border-[#d4d0c8]">
      <div className="px-6 py-4 border-b border-[#d4d0c8] flex justify-between items-center">
        <h2 className="font-medium text-lg text-[#1a1a1a]">Stories Pending Review</h2>
        <button className="text-[#1a1a1a] text-sm hover:text-[#c41e3a] transition-colors">
          View All →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#d4d0c8]">
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">
                Story
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6b6b6b] uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e5dd]">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-[#f5f2ed] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1a1a1a]">{story.title}</p>
                  <p className="text-sm text-[#6b6b6b] mt-1">Submitted {story.submittedRelative}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#6b6b6b]">{story.author}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs border ${getCategoryStyles(story.category)}`}
                  >
                    {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs ${getStatusStyles(story.status)}`}
                  >
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {story.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(story)}
                        className="px-3 py-1 text-xs text-[#1a1a1a] hover:text-[#c41e3a] transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onApprove(story)}
                        className="px-3 py-1 text-xs bg-[#1a1a1a] text-[#faf8f5] hover:bg-[#2a2a2a] transition-colors"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => onReject(story)}
                        className="px-3 py-1 text-xs bg-[#c41e3a] text-white hover:bg-[#9b1628] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {story.status === "approved" && (
                    <button
                      onClick={() => onApprove(story)}
                      className="px-4 py-1 text-xs bg-[#1a1a1a] text-[#faf8f5] hover:bg-[#2a2a2a] transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  {story.status === "published" && (
                    <button className="text-xs text-[#1a1a1a] hover:text-[#c41e3a] transition-colors">
                      View →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
