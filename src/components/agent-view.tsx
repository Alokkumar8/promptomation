import LogFeed from "./log-feed";
import LiveView from "./live-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AgentViewProps {
  prompt: string;
}

export default function AgentView({ prompt }: AgentViewProps) {
  return (
    <div className="w-full h-[85vh] grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in duration-500">
      <Card className="flex flex-col animate-in slide-in-from-left-5 duration-500 h-full">
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
      <Card className="flex flex-col animate-in slide-in-from-right-5 duration-500 h-full">
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
  );
}
