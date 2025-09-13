"use client";

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LiveViewProps {
  agentId: string;
}

export default function LiveView({ agentId }: LiveViewProps) {
  const [liveViewUrl, setLiveViewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!agentId) return;

    const fetchUrl = async () => {
        try {
            const response = await fetch(`https://aiagents.onrender.com/get-live-url?agent_id=${agentId}`);
            if (!response.ok) return;
            const data = await response.json();
            // Assuming the API returns a URL in a field, e.g., 'live_view_url' or similar
            // The user provided an example that returns just a string, so let's handle that.
            if (typeof data === 'string') {
                 setLiveViewUrl(data);
            } else if (data.live_view_url) {
                 setLiveViewUrl(data.live_view_url);
            } else if (data.url) {
                 setLiveViewUrl(data.url);
            }
        } catch (error) {
            console.error("Failed to fetch live view URL:", error);
        }
    }
    
    fetchUrl(); // Initial fetch
    const interval = setInterval(fetchUrl, 5000);

    return () => clearInterval(interval);
  }, [agentId]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border bg-muted">
      {liveViewUrl ? (
        <iframe
          src={liveViewUrl}
          title="Live Agent View"
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      ) : (
        <div className="w-full h-full p-4">
            <Skeleton className="w-full h-full bg-primary/10" />
        </div>
      )}
    </div>
  );
}
