
"use client";

import { useState } from 'react';
import PromptForm from '@/components/prompt-form';
import AgentView from '@/components/agent-view';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [agentId, setAgentId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePromptSubmit = (submittedPrompt: string) => {
    setPrompt(submittedPrompt);
    setIsAnimating(true);
    setAgentId("10163");

    // This timeout ensures the animation plays before the component is swapped
    setTimeout(() => {
        setIsAgentRunning(true);
    }, 1200); // This should match the animation duration

    // Fire off the API call in the background. No need to await it here
    // as we are navigating to the next screen optimistically.
    fetch(`https://aiagents.onrender.com/api-run-agent-from-prompt?prompt=${encodeURIComponent(submittedPrompt)}&agent_id=10163`)
      .catch(error => {
          console.error("Failed to run agent from prompt:", error);
          // Optional: handle error, e.g., show a toast notification
          // For now, we'll proceed to the agent view anyway since we have a static ID
      });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden relative">
        <Image
            src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_webp/03da72234522093.68c4ebbaa1384.png"
            alt="Background"
            fill
            className="object-cover -z-20"
            data-ai-hint="futuristic abstract"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary" />
            </div>
        </div>

      {!isAgentRunning ?
        <div className={`w-full max-w-2xl relative text-center ${isAnimating ? 'animate-form-out' : 'animate-in fade-in zoom-in-95 duration-500'}`}>
           <h2 className="font-headline text-3xl sm:text-4xl text-white">Promptomation</h2>
           <p className="text-base text-white/80 mt-2 mb-8 max-w-xl mx-auto">
                Describe the browser task you want to automate in plain English.
           </p>
          <PromptForm onSubmit={handlePromptSubmit} isAnimating={isAnimating} />
        </div>
        :
        agentId && <AgentView prompt={prompt} agentId={agentId} />
      }
    </main>
  );
}
