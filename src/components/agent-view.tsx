"use client";

import { useEffect, useState } from "react";
import LogFeed from "./log-feed";
import LiveView from "./live-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AgentViewProps {
  prompt: string;
}

export default function AgentView({ prompt }: AgentViewProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Delay content appearance to sync with animation
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
        <div className={`transition-opacity duration-500 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'} flex flex-col h-full min-h-0`}>
          <Card className="flex flex-col flex-grow bg-white/5 border-white/20 backdrop-blur-md shadow-2xl shadow-primary/10 min-h-0">
            <CardHeader>
              <CardTitle className="font-headline text-white">Agent Logs</CardTitle>
              <CardDescription className="truncate text-white/80">
                Task: {prompt}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow min-h-0">
              <LogFeed />
            </CardContent>
          </Card>
        </div>
        <div className={`transition-opacity duration-500 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'} flex flex-col h-full min-h-0`}>
          <Card className="flex flex-col flex-grow bg-white/5 border-white/20 backdrop-blur-md shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="font-headline text-white">Live View</CardTitle>
              <CardDescription className="text-white/80">
                A real-time view of the agent's browser.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <LiveView />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
