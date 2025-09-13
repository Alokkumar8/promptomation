"use client";

import { useEffect, useState } from "react";
import LogFeed from "./log-feed";
import LiveView from "./live-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AgentViewProps {
  prompt: string;
  isAnimating: boolean;
}

export default function AgentView({ prompt, isAnimating }: AgentViewProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500); // Delay content appearance to sync with animation
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div 
        className="w-full h-full absolute"
        style={{
            top: 0,
            left: 0,
        }}
        >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Left Panel BG */}
          <path
            className="fill-card"
            style={{
              animation: 'expandLeft 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M50 50 H50 V50 H50z"
          />
          {/* Left Panel Border */}
          <path
            className="stroke-border"
            strokeWidth="0.1"
            fill="none"
            style={{
              animation: 'expandLeft 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M50 50 H50 V50 H50z"
          />

          {/* Right Panel BG */}
          <path
            className="fill-card"
            style={{
              animation: 'expandRight 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M50 50 H50 V50 H50z"
          />
          {/* Right Panel Border */}
          <path
            className="stroke-border"
            strokeWidth="0.1"
            fill="none"
            style={{
              animation: 'expandRight 1.2s cubic-bezier(0.6, 0.0, 0.2, 1) forwards',
            }}
            d="M50 50 H50 V50 H50z"
          />
        </svg>
      </div>
      
      <div className={`transition-opacity duration-500 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Card className="flex flex-col h-full bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="font-headline">Agent Logs</CardTitle>
            <CardDescription className="truncate">
              Task: {prompt}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <LogFeed />
          </CardContent>
        </Card>
      </div>
      <div className={`transition-opacity duration-500 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Card className="flex flex-col h-full bg-transparent border-none shadow-none">
          <CardHeader>
            <CardTitle className="font-headline">Live View</CardTitle>
            <CardDescription>
              A real-time view of the agent's browser.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <LiveView />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
