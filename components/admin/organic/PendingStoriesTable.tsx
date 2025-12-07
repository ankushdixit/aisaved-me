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
      return "bg-[#fff3e0] text-[#8d6e63]";
    case "medical":
      return "bg-[#e8f5e9] text-[#558b2f]";
    case "financial":
      return "bg-[#fce4ec] text-[#c2185b]";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getStatusStyles(status: PendingStory["status"]) {
  switch (status) {
    case "pending":
      return "bg-[#f2cc8f] text-[#3d405b]";
    case "approved":
      return "bg-[#81b29a] text-white";
    case "published":
      return "bg-[#e07a5f] text-white";
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
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      <div className="px-6 py-4 bg-[#fff8f0] border-b border-[#f2cc8f]/30 flex justify-between items-center">
        <h2 className="font-semibold text-lg text-[#3d405b]">Stories Pending Review</h2>
        <button className="text-[#e07a5f] font-medium hover:text-[#c66b52] transition-colors">
          View All →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#f2cc8f]/30">
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Story
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b6b6b] uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2cc8f]/20">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-[#fff8f0] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#3d405b]">{story.title}</p>
                  <p className="text-sm text-[#6b6b6b] mt-1">Submitted {story.submittedRelative}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#5a5d7a]">{story.author}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryStyles(story.category)}`}
                  >
                    {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusStyles(story.status)}`}
                  >
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {story.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(story)}
                        className="px-3 py-1 text-xs font-medium text-[#e07a5f] hover:text-[#c66b52] transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onApprove(story)}
                        className="px-3 py-1 text-xs font-medium bg-[#81b29a] text-white rounded-lg hover:bg-[#6d9a84] transition-colors"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => onReject(story)}
                        className="px-3 py-1 text-xs font-medium bg-[#e07a5f] text-white rounded-lg hover:bg-[#c66b52] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {story.status === "approved" && (
                    <button
                      onClick={() => onApprove(story)}
                      className="px-4 py-1 text-xs font-medium bg-[#e07a5f] text-white rounded-lg hover:bg-[#c66b52] transition-colors"
                    >
                      Publish
                    </button>
                  )}
                  {story.status === "published" && (
                    <button className="text-xs font-medium text-[#e07a5f] hover:text-[#c66b52] transition-colors">
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
