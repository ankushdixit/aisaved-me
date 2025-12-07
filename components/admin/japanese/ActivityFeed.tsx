"use client";

import { type ActivityItem } from "@/lib/mock-data/pending-stories";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function getActivityColor(type: ActivityItem["type"]) {
  switch (type) {
    case "story_published":
      return "bg-[#c41e3a]";
    case "story_approved":
      return "bg-[#1a1a1a]";
    case "story_rejected":
      return "bg-[#6b6b6b]";
    case "user_registered":
      return "bg-[#1a1a1a]";
  }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-[#faf8f5] border border-[#d4d0c8] p-6">
      <h2 className="font-medium text-lg text-[#1a1a1a] mb-6">Recent Activity</h2>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(activity.type)}`} />
            <div>
              <p className="text-[#1a1a1a]">{activity.description}</p>
              <p className="text-sm text-[#6b6b6b] mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
