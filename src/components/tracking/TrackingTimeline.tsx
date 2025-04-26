
import React from "react";
import { TrackingInfo } from "@/types/shipment";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TrackingTimelineProps {
  trackingInfo: TrackingInfo;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ trackingInfo }) => {
  return (
    <div className="space-y-2 py-2">
      {trackingInfo.events.map((event, index) => {
        const isLast = index === 0;
        return (
          <div key={index} className="relative pl-8">
            {index < trackingInfo.events.length - 1 && (
              <div
                className={cn(
                  "absolute left-[10px] top-[22px] bottom-0 w-0.5",
                  isLast ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
            <div
              className={cn(
                "absolute left-0 rounded-full w-5 h-5 flex items-center justify-center",
                isLast
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary border border-gray-200"
              )}
            >
              {isLast && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span
                  className={cn(
                    "font-medium",
                    isLast ? "text-primary" : "text-foreground"
                  )}
                >
                  {event.status}
                </span>
                <time
                  dateTime={event.timestamp}
                  className="text-xs text-muted-foreground"
                >
                  {format(new Date(event.timestamp), "yyyy.MM.dd HH:mm")}
                </time>
              </div>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground">{event.location}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingTimeline;
