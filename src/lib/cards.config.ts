
export type ToolCard = {
  id: string;
  title: string;
  subtitle?: string;
  route: string;           // where "Use Tool" goes
  guide?: string;          // where "Read Guide" goes
  category: "marketing"|"leadgen"|"creative"|"sales"|"social"|"web"|"editing"|"ads";
  flags?: ("NEW"|"BETA"|"SOON")[];
  icon?: string;           // existing icon key if you have a registry
};

export const TOOL_CARDS: ToolCard[] = [
  {
    id: "projects-finder",
    title: "AI Projects Finder",
    subtitle: "Discover high-fit opportunities in your markets.",
    route: "/tools/projects-finder",
    guide: "/docs/projects-finder",
    category: "leadgen",
    flags: ["NEW"]
  },
  {
    id: "ad-creator",
    title: "AI Ad Creator",
    subtitle: "Brochure → platform-ready ads (Feed/Story/Reel).",
    route: "/tools/ad-creator",
    guide: "/docs/ad-creator",
    category: "ads"
  },
  {
    id: "precision-targeting",
    title: "AI Precision Targeting",
    subtitle: "Signals → buyers before they search.",
    route: "/tools/precision-targeting",
    guide: "/docs/precision-targeting",
    category: "leadgen"
  },
  // ...add all existing tools here with their current routes
];

// Optional filters if you need them programmatically
export const byCategory = (cat: ToolCard["category"]) =>
  TOOL_CARDS.filter(c => c.category === cat);
