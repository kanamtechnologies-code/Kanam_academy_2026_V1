import {
  Award,
  Bot,
  Brain,
  Database,
  Monitor,
  Shield,
  type LucideIcon,
} from "lucide-react";

import type { Track } from "@/lib/tracks";
import { cn } from "@/lib/utils";

const TRACK_ICONS: Record<Track["id"], LucideIcon> = {
  "python-starter": Bot,
  "data-analyst": Database,
  "ai-literacy": Brain,
  "digital-literacy": Monitor,
  cybersecurity: Shield,
};

function TrackGlyph({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return <Icon className={cn("h-4 w-4 shrink-0", className)} aria-hidden />;
}

export function TrackIcon({
  trackId,
  className,
}: {
  trackId: Track["id"];
  className?: string;
}) {
  const icon = TRACK_ICONS[trackId] ?? Award;
  return <TrackGlyph icon={icon} className={className} />;
}
