"use client";

import { type ActivityItem } from "@/lib/mock-data/pending-stories";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function getActivityColor(type: ActivityItem["type"]) {
  switch (type) {
    case "story_published":
      return "bg-[#81b29a]";
    case "story_approved":
      return "bg-[#f2cc8f]";
    case "story_rejected":
      return "bg-[#e07a5f]";
    case "user_registered":
      return "bg-[#3d405b]";
  }
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6">
      <h2 className="font-semibold text-lg text-[#3d405b] mb-6">Recent Activity</h2>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className={`w-3 h-3 rounded-full mt-1.5 ${getActivityColor(activity.type)}`} />
            <div>
              <p className="text-[#5a5d7a]">{activity.description}</p>
              <p className="text-sm text-[#6b6b6b] mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
