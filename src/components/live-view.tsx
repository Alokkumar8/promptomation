"use client";

import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LiveView() {
  const [liveViewUrl, setLiveViewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
        try {
            const response = await fetch('/api/live-view');
            if (!response.ok) return;
            const data = await response.json();
            setLiveViewUrl(data.live_view_url);
        } catch (error) {
            console.error("Failed to fetch live view URL:", error);
        }
    }
    
    fetchUrl(); // Initial fetch
    const interval = setInterval(fetchUrl, 5000);

    return () => clearInterval(interval);
  }, []);

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
