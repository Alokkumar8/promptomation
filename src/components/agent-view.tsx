import LogFeed from "./log-feed";
import LiveView from "./live-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AgentViewProps {
  prompt: string;
}

export default function AgentView({ prompt }: AgentViewProps) {
  return (
    <div className="w-full h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="animate-in fade-in duration-500 delay-500 fill-mode-backwards">
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
      <div className="animate-in fade-in duration-500 delay-500 fill-mode-backwards">
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
