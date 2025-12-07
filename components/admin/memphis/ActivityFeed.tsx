"use client";

import { type ActivityItem } from "@/lib/mock-data/pending-stories";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function getActivityColor(type: ActivityItem["type"]) {
  switch (type) {
    case "story_published":
      return "bg-[#00FF7F]";
    case "story_approved":
      return "bg-[#FFD700]";
    case "story_rejected":
      return "bg-[#FF6B6B]";
    case "user_registered":
      return "bg-[#0066FF]";
  }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white border-3 border-black shadow-memphis-md p-6">
      <h2 className="font-display font-bold text-lg text-black mb-6">Recent Activity</h2>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div
              className={`w-3 h-3 rounded-full border-2 border-black mt-1.5 ${getActivityColor(activity.type)}`}
            />
            <div>
              <p className="font-body text-gray-700">{activity.description}</p>
              <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
