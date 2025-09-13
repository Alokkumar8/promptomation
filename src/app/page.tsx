"use client";

import { useState } from 'react';
import PromptForm from '@/components/prompt-form';
import AgentView from '@/components/agent-view';

export default function Home() {
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handlePromptSubmit = (submittedPrompt: string) => {
    // In a real application, you would call the agent creation API here.
    // e.g., fetch(`https://exampleapi.com/create-agent-from-prompt?prompt=${encodeURIComponent(submittedPrompt)}`)
    // For this demo, we'll just simulate a successful start.
    setPrompt(submittedPrompt);
    setIsAgentRunning(true);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      {!isAgentRunning ? (
        <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
            <PromptForm onSubmit={handlePromptSubmit} />
        </div>
      ) : (
        <AgentView prompt={prompt} />
      )}
    </main>
  );
}
