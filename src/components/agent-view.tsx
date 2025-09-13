"use client";

import { useEffect, useState } from "react";
import LogFeed from "./log-feed";
import LiveView from "./live-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

interface AgentViewProps {
  prompt: string;
  agentId: string;
}

export default function AgentView({ prompt, agentId }: AgentViewProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // This timer should align with the end of the SVG path animations
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1200); 
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-screen absolute top-0 left-0">
      <div 
        className="w-full h-full absolute top-0 left-0 -z-10"
        >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path
            className="fill-[hsla(0,0%,100%,0.05)]"
            style={{
              animation: 'expandLeft 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M40 30 H60 V70 H40z"
          />
          <path
            className="stroke-border"
            strokeWidth="0.1"
            fill="none"
            style={{
              animation: 'expandLeft 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M40 30 H60 V70 H40z"
          />

          <path
            className="fill-[hsla(0,0%,100%,0.05)]"
            style={{
              animation: 'expandRight 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M40 30 H60 V70 H40z"
          />
          <path
            className="stroke-border"
            strokeWidth="0.1"
            fill="none"
            style={{
              animation: 'expandRight 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M40 30 H60 V70 H40z"
          />
        </svg>
      </div>

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-8 md:p-12">
        <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'} flex flex-col h-full min-h-0`}>
          <Card className="flex flex-col flex-grow bg-white/10 border-white/20 backdrop-blur-md shadow-2xl shadow-primary/10 min-h-0">
            <CardHeader>
              <CardTitle className="font-headline text-white">Agent Logs</CardTitle>
              <CardDescription className="truncate text-white/80">
                Task: {prompt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow min-h-0">
              {showContent ? (
                <LogFeed agentId={agentId} />
              ) : (
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-accent/20" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-24 bg-accent/20" />
                      <Skeleton className="h-4 w-4/5 bg-accent/20" />
                    </div>
                  </div>
                   <div className="flex items-start gap-3 opacity-60">
                    <Skeleton className="h-10 w-10 rounded-full bg-accent/20" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-24 bg-accent/20" />
                      <Skeleton className="h-4 w-3/5 bg-accent/20" />
                    </div>
                  </div>
                   <div className="flex items-start gap-3 opacity-30">
                    <Skeleton className="h-10 w-10 rounded-full bg-accent/20" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-4 w-24 bg-accent/20" />
                      <Skeleton className="h-4 w-4/5 bg-accent/20" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'} flex flex-col h-full min-h-0`}>
          <Card className="flex flex-col flex-grow bg-white/5 border-white/20 backdrop-blur-md shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="font-headline text-white">Live View</CardTitle>
              <CardDescription className="text-white/80">
                A real-time view of the agent's browser.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
               {showContent ? (
                <LiveView agentId={agentId} />
               ) : (
                <div className="w-full h-full p-4">
                    <Skeleton className="w-full h-full bg-primary/10" />
                </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
