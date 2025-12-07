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
      return "bg-[#FFD700] text-black border-black";
    case "medical":
      return "bg-[#00FF7F] text-black border-black";
    case "financial":
      return "bg-[#FF1493] text-white border-black";
    default:
      return "bg-gray-200 text-black border-black";
  }
}

function getStatusStyles(status: PendingStory["status"]) {
  switch (status) {
    case "pending":
      return "bg-[#FFD700] text-black";
    case "approved":
      return "bg-[#00FF7F] text-black";
    case "published":
      return "bg-[#0066FF] text-white";
    case "rejected":
      return "bg-[#FF6B6B] text-white";
  }
}

export function PendingStoriesTable({
  stories,
  onView,
  onApprove,
  onReject,
}: PendingStoriesTableProps) {
  return (
    <div className="bg-white border-3 border-black shadow-memphis-md overflow-hidden">
      <div className="px-6 py-4 bg-[#FFF9E6] border-b-3 border-black flex justify-between items-center">
        <h2 className="font-display font-bold text-lg text-black">Stories Pending Review</h2>
        <button className="text-[#0066FF] font-body font-bold hover:underline">View All →</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                Story
              </th>
              <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-display font-bold text-gray-500 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-200">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-[#FFF9E6] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-body font-bold text-black">{story.title}</p>
                  <p className="text-sm text-gray-500 mt-1">Submitted {story.submittedRelative}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="font-body text-gray-700">{story.author}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-display font-bold border-2 transform -rotate-1 ${getCategoryStyles(story.category)}`}
                  >
                    {story.category.charAt(0).toUpperCase() + story.category.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-display font-bold border-2 border-black ${getStatusStyles(story.status)}`}
                  >
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {story.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onView(story)}
                        className="px-3 py-1 text-xs font-display font-bold text-[#0066FF] hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onApprove(story)}
                        className="btn-memphis-sm px-3 py-1 text-xs bg-[#00FF7F] text-black"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => onReject(story)}
                        className="btn-memphis-sm px-3 py-1 text-xs bg-[#FF6B6B] text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {story.status === "approved" && (
                    <button
                      onClick={() => onApprove(story)}
                      className="btn-memphis-sm px-4 py-1 text-xs bg-[#0066FF] text-white"
                    >
                      Publish
                    </button>
                  )}
                  {story.status === "published" && (
                    <button className="text-xs font-display font-bold text-[#0066FF] hover:underline">
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
