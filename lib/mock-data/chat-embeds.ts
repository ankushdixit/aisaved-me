/**
 * Mock chat conversation data for story detail pages
 * These embeds show actual AI conversations from the stories
 */

import type { ChatEmbed } from "@/lib/types/story";

export const chatEmbeds: Record<string, ChatEmbed> = {
  "story-1": {
    storyId: "story-1",
    aiTool: "claude",
    aiToolLabel: "Claude",
    messages: [
      {
        id: "msg-1-1",
        role: "user",
        content:
          "I received a damage claim for $3,200 from Enterprise. I have photos from return showing no damage. What are my options?",
      },
      {
        id: "msg-1-2",
        role: "ai",
        content:
          "Based on your documentation, you have several strong defenses:\n\n1. Burden of proof is on Enterprise\n2. Your photos establish baseline condition\n3. Return inspection record shows no damage\n4. Timeline questions (3 weeks delay)",
      },
      {
        id: "msg-1-3",
        role: "user",
        content: "How should I structure my response letter?",
      },
    ],
  },
  "story-2": {
    storyId: "story-2",
    aiTool: "claude",
    aiToolLabel: "Claude",
    messages: [
      {
        id: "msg-2-1",
        role: "user",
        content:
          "My landlord is withholding my $2,400 security deposit claiming damages that were there when I moved in. I have photos from move-in.",
      },
      {
        id: "msg-2-2",
        role: "ai",
        content:
          "Your move-in photos are excellent evidence. Under tenant law:\n\n1. Landlords must provide itemized deduction list\n2. Pre-existing damage cannot be charged to you\n3. Normal wear and tear is not deductible\n4. You can send a formal demand letter",
      },
      {
        id: "msg-2-3",
        role: "user",
        content: "Can you help me draft that demand letter?",
      },
    ],
  },
  "story-3": {
    storyId: "story-3",
    aiTool: "chatgpt",
    aiToolLabel: "ChatGPT",
    messages: [
      {
        id: "msg-3-1",
        role: "user",
        content:
          "A contractor took $5,500 for a bathroom remodel but abandoned the job halfway through. Can I take them to small claims court?",
      },
      {
        id: "msg-3-2",
        role: "ai",
        content:
          "Yes, small claims court is ideal for this amount. Key steps:\n\n1. Document all payments and work done\n2. Get estimates for completion cost\n3. Send demand letter first (required in most states)\n4. File within statute of limitations",
      },
      {
        id: "msg-3-3",
        role: "user",
        content: "What evidence should I bring to court?",
      },
    ],
  },
  "story-4": {
    storyId: "story-4",
    aiTool: "claude",
    aiToolLabel: "Claude",
    messages: [
      {
        id: "msg-4-1",
        role: "user",
        content:
          "My insurance company denied a $12,000 medical claim saying it wasn't medically necessary. My doctor prescribed the procedure.",
      },
      {
        id: "msg-4-2",
        role: "ai",
        content:
          "Insurance denials for medical necessity can often be overturned:\n\n1. Request the specific denial reason in writing\n2. Get your doctor's letter of medical necessity\n3. Review your policy for appeal deadlines\n4. Reference clinical guidelines supporting the procedure",
      },
      {
        id: "msg-4-3",
        role: "user",
        content: "How do I file the appeal?",
      },
    ],
  },
  "story-9": {
    storyId: "story-9",
    aiTool: "claude",
    aiToolLabel: "Claude",
    messages: [
      {
        id: "msg-9-1",
        role: "user",
        content:
          "I've had severe lower back pain radiating to my side for 3 days. Pain is 8/10 and I noticed blood in my urine this morning.",
      },
      {
        id: "msg-9-2",
        role: "ai",
        content:
          "Your symptoms strongly suggest kidney stones. The combination of:\n\n- Severe flank pain radiating down\n- Blood in urine (hematuria)\n- Pain severity\n\nI recommend seeing a doctor urgently. They'll likely order a CT scan to confirm.",
      },
      {
        id: "msg-9-3",
        role: "user",
        content: "What should I tell my doctor?",
      },
    ],
  },
};

/**
 * Get chat embed for a story by ID
 */
export function getChatEmbed(storyId: string): ChatEmbed | undefined {
  return chatEmbeds[storyId];
}
