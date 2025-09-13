"use client";

import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, FileText, MousePointerClick, Type } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface Log {
  timestamp: number;
  message: string;
}

interface LogFeedProps {
  agentId: string;
}

const getIconForMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('click')) return <MousePointerClick className="h-4 w-4" />;
    if (lowerMessage.includes('type') || lowerMessage.includes('typing')) return <Type className="h-4 w-4" />;
    if (lowerMessage.includes('navigate') || lowerMessage.includes('page')) return <FileText className="h-4 w-4" />;
    return <Bot className="h-4 w-4" />;
}

export default function LogFeed({ agentId }: LogFeedProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!agentId) return;

    const fetchLog = async () => {
      try {
        const response = await fetch(`https://aiagents.onrender.com/api-get-logs?agent_id=${agentId}`);
        if (!response.ok) return;
        const newLogs = await response.json();
        if (Array.isArray(newLogs)) {
            // The API returns the full log history, so we replace the existing logs.
            const formattedLogs = newLogs.map((log: any) => ({
                timestamp: log.timestamp || Date.now(),
                message: log.log || log.message || ''
            }));
            setLogs(formattedLogs);
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLog();
    const interval = setInterval(fetchLog, 1000); // Fetch logs every second

    return () => clearInterval(interval);
  }, [agentId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [logs]);

  return (
    <ScrollArea className="h-full w-full rounded-md border border-dashed border-accent/50 p-4" ref={scrollAreaRef}>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <div className="flex flex-col gap-4">
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
        {!isLoading && logs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-16 text-center">
                <Bot className="h-12 w-12 mb-4" />
                <p className="font-headline">Waiting for agent to start...</p>
                <p className="text-sm">Logs will appear here shortly.</p>
            </div>
        )}
        {logs.map((log, index) => (
          <div key={`${log.timestamp}-${index}`} className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="p-2 bg-accent/20 rounded-full text-accent">
                {getIconForMessage(log.message)}
            </div>
            <div>
                <p className="font-mono text-xs text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-sm">{log.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
